import { Router, Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { config } from "../config";
import { AppError } from "../middleware/errorHandler";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema, refreshSchema } from "../schemas/auth";

const router: Router = Router();

/** Hash a refresh token before storage so raw tokens are never persisted. */
function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** Sign a short-lived access token (default 15m) with the user's ID. */
function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: config.JWT_ACCESS_EXPIRES_IN } as jwt.SignOptions);
}

/** Generate a cryptographically random raw refresh token. */
function generateRefreshToken() {
  return crypto.randomBytes(48).toString("hex");
}

/**
 * POST /auth/register — Create a new user.
 * Hashes the password (argon2id), issues access + refresh tokens, and stores
 * the refresh token hash in a session. 409 EMAIL_EXISTS if the email is taken.
 */
router.post("/register", validate(registerSchema), async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, "EMAIL_EXISTS", "A user with this email already exists");
  }

  const passwordHash = await argon2.hash(password);

  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  const accessToken = generateAccessToken(user.id);
  const rawRefreshToken = generateRefreshToken();
  const tokenHash = hashToken(rawRefreshToken);

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.status(201).json({
    data: {
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken: rawRefreshToken,
    },
  });
});


/** POST /auth/login — Authenticate with email + password. 401 INVALID_CREDENTIALS on failure. */
router.post("/login", validate(loginSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id);
  const rawRefreshToken = generateRefreshToken();
  const tokenHash = hashToken(rawRefreshToken);

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.json({
    data: {
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken: rawRefreshToken,
    },
  });
});


/**
 * POST /auth/refresh — Rotate a refresh token.
 * Revokes the presented session and issues a fresh access + refresh token pair.
 * 401 INVALID_TOKEN if the token is revoked or expired.
 */
router.post("/refresh", validate(refreshSchema), async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokenHash = hashToken(refreshToken);

  const session = await prisma.session.findFirst({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  if (!session) {
    throw new AppError(401, "INVALID_TOKEN", "Refresh token is invalid or expired");
  }

  await prisma.session.update({
    where: { id: session.id },
    data: { revokedAt: new Date() },
  });

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    throw new AppError(401, "INVALID_TOKEN", "User not found");
  }

  const accessToken = generateAccessToken(user.id);
  const rawRefreshToken = generateRefreshToken();
  const newTokenHash = hashToken(rawRefreshToken);

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: newTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.json({
    data: {
      accessToken,
      refreshToken: rawRefreshToken,
    },
  });
});

/** POST /auth/logout — Revoke the presented refresh token's session. */
router.post("/logout", requireAuth, async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);
    await prisma.session.updateMany({
      where: { tokenHash, userId: req.userId! },
      data: { revokedAt: new Date() },
    });
  }

  res.json({ data: { message: "Logged out successfully" } });
});
export default router;
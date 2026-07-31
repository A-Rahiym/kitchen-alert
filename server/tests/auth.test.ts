import { describe, it, expect } from "vitest";

const BASE = "http://localhost:3000";

/*
 * Auth endpoints — register, login, token refresh, logout
 *
 * Covers the full auth lifecycle: creating an account, authenticating,
 * rotating refresh tokens, revoking sessions on logout, and verifying
 * that expired/revoked tokens are rejected. Also confirms that protected
 * routes return 401 when no bearer token is provided.
 */
describe("auth endpoints", () => {
  const email = `test-${Date.now()}@example.com`;
  const password = "password123";
  let accessToken = "";
  let refreshToken = "";

  /* Register a new user — expects 201 with user object and auth tokens */
  it("POST /auth/register — creates user", async () => {
    const res = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name: "Test User" }),
    });
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.data.user.email).toBe(email);
    expect(body.data.accessToken).toBeTruthy();
    expect(body.data.refreshToken).toBeTruthy();
  });

  /* Register with the same email — expects 409 Conflict */
  it("POST /auth/register — 409 on duplicate email", async () => {
    const res = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    expect(res.status).toBe(409);
  });

  /* Login with correct credentials — expects 200 with tokens */
  it("POST /auth/login — returns tokens", async () => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.accessToken).toBeTruthy();
    expect(body.data.refreshToken).toBeTruthy();
    accessToken = body.data.accessToken;
    refreshToken = body.data.refreshToken;
  });

  /* Login with wrong password — expects 401 Unauthorized */
  it("POST /auth/login — 401 on wrong password", async () => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "wrong" }),
    });
    expect(res.status).toBe(401);
  });

  /* Refresh a valid refresh token — expects 200 with rotated tokens */
  it("POST /auth/refresh — rotates tokens", async () => {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.accessToken).toBeTruthy();
    expect(body.data.refreshToken).toBeTruthy();
    refreshToken = body.data.refreshToken;
  });

  /* Logout with valid access + refresh token — expects 200 */
  it("POST /auth/logout — succeeds with valid token", async () => {
    const res = await fetch(`${BASE}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ refreshToken }),
    });
    expect(res.status).toBe(200);
  });

  /* Use the now-revoked refresh token — expects 401 */
  it("POST /auth/refresh — 401 after logout (old refresh token)", async () => {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    expect(res.status).toBe(401);
  });

  /* Access a protected route without a bearer token — expects 401 */
  it("GET /items — 401 without token", async () => {
    const res = await fetch(`${BASE}/items`);
    expect(res.status).toBe(401);
  });
});

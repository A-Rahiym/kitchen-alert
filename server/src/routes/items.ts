import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createItemSchema, updateItemSchema, itemIdParamsSchema } from "../schemas/items";

const router: Router = Router();

router.use(requireAuth);

/** GET /items — List all pantry items owned by the authenticated user. */
router.get("/", async (req: Request, res: Response) => {
  const items = await prisma.pantryItem.findMany({
    where: { userId: req.userId! },
    orderBy: { name: "asc" },
  });

  res.json({ data: items });
});

/** GET /items/:id — Fetch a single item. Returns 404 if missing or owned by another user. */
router.get("/:id", validate(itemIdParamsSchema, "params"), async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const item = await prisma.pantryItem.findUnique({
    where: { id },
  });

  if (!item || item.userId !== req.userId) {
    throw new AppError(404, "NOT_FOUND", "Pantry item not found");
  }

  res.json({ data: item });
});

/** POST /items — Create a pantry item for the authenticated user. */
router.post("/", requireAuth, validate(createItemSchema), async (req: Request, res: Response) => {
  const item = await prisma.pantryItem.create({
    data: {
      ...req.body,
      userId: req.userId!,
    },
  });

  res.status(201).json({ data: item });
});

/** PUT /items/:id — Update item fields. Returns 404 if missing or owned by another user. */
router.put("/:id", validate(itemIdParamsSchema, "params"), validate(updateItemSchema), async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const existing = await prisma.pantryItem.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== req.userId) {
    throw new AppError(404, "NOT_FOUND", "Pantry item not found");
  }

  const item = await prisma.pantryItem.update({
    where: { id },
    data: req.body,
  });

  res.json({ data: item });
});

/** DELETE /items/:id — Soft-delete by zeroing quantity. Purchase history is preserved. */
router.delete("/:id", validate(itemIdParamsSchema, "params"), async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const existing = await prisma.pantryItem.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== req.userId) {
    throw new AppError(404, "NOT_FOUND", "Pantry item not found");
  }

  await prisma.pantryItem.update({
    where: { id },
    data: { currentQuantity: 0 },
  });

  res.json({ data: { message: "Item quantity zeroed" } });
});

export default router;

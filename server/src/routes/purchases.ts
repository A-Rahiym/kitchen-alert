import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createPurchaseSchema, updatePurchaseSchema, purchaseIdParamsSchema, purchaseQuerySchema } from "../schemas/purchases";
import { recalculateStock, validateCapacity } from "../services/inventory";

const router: Router = Router();

router.use(requireAuth);

/**
 * GET /purchases — List purchases for the authenticated user.
 * Supports pagination (page/pageSize) and optional filters: itemId,
 * month (YYYY-MM), and a date range (dateFrom/dateTo).
 */
router.get("/", validate(purchaseQuerySchema, "query"), async (req: Request, res: Response) => {
  const { itemId, month, dateFrom, dateTo, page, pageSize } = req.query as unknown as {
    itemId?: string;
    month?: string;
    dateFrom?: string;
    dateTo?: string;
    page: number;
    pageSize: number;
  };

  const where: Record<string, unknown> = { userId: req.userId! };

  if (itemId) where.itemId = itemId;
  if (dateFrom || dateTo) {
    where.date = {};
    if (dateFrom) (where.date as Record<string, unknown>).gte = new Date(dateFrom);
    if (dateTo) (where.date as Record<string, unknown>).lte = new Date(dateTo);
  }
  if (month) {
    where.date = {
      ...(where.date as Record<string, unknown>),
      gte: new Date(`${month}-01`),
      lte: new Date(`${month}-31`),
    };
  }

  const [purchases, total] = await Promise.all([
    prisma.purchase.findMany({
      where: where as any,
      orderBy: { date: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.purchase.count({ where: where as any }),
  ]);

  res.json({
    data: purchases,
    meta: { page, pageSize, total },
  });
});

/** GET /purchases/:id — Fetch a single purchase. 404 if missing or owned by another user. */
router.get("/:id", validate(purchaseIdParamsSchema, "params"), async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const purchase = await prisma.purchase.findUnique({
    where: { id },
  });

  if (!purchase || purchase.userId !== req.userId) {
    throw new AppError(404, "NOT_FOUND", "Purchase not found");
  }

  res.json({ data: purchase });
});

/**
 * POST /purchases — Record a purchase and update the item's stock.
 * Fails with 409 if the purchase would exceed item capacity, unless
 * override:true is sent. Stock is recalculated inside the same transaction.
 */
router.post("/", validate(createPurchaseSchema), async (req: Request, res: Response) => {
  const { itemId, date, quantity, amount, override } = req.body;

  const item = await prisma.pantryItem.findUnique({
    where: { id: itemId },
  });

  if (!item || item.userId !== req.userId) {
    throw new AppError(404, "NOT_FOUND", "Pantry item not found");
  }

  if (!override) {
    await validateCapacity(itemId, quantity, req.userId!);
  }

  const purchase = await prisma.$transaction(async (tx) => {
    const p = await tx.purchase.create({
      data: {
        userId: req.userId!,
        itemId,
        date: new Date(date),
        quantity,
        amount,
      },
    });

    const newQty = await recalculateStock(itemId, req.userId!, tx);
    return { purchase: p, currentQuantity: newQty };
  });

  res.status(201).json({ data: purchase });
});

/** PUT /purchases/:id — Update a purchase and recalculate stock in the same transaction. */
router.put("/:id", validate(purchaseIdParamsSchema, "params"), validate(updatePurchaseSchema), async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const existing = await prisma.purchase.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== req.userId) {
    throw new AppError(404, "NOT_FOUND", "Purchase not found");
  }

  const updateData: Record<string, unknown> = {};
  if (req.body.date) updateData.date = new Date(req.body.date);
  if (req.body.quantity !== undefined) updateData.quantity = req.body.quantity;
  if (req.body.amount !== undefined) updateData.amount = req.body.amount;

  const purchase = await prisma.$transaction(async (tx) => {
    const p = await tx.purchase.update({
      where: { id },
      data: updateData,
    });

    const newQty = await recalculateStock(existing.itemId, req.userId!, tx);
    return { purchase: p, currentQuantity: newQty };
  });

  res.json({ data: purchase });
});

/** DELETE /purchases/:id — Delete a purchase and safely recalculate stock from history. */
router.delete("/:id", validate(purchaseIdParamsSchema, "params"), async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const existing = await prisma.purchase.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== req.userId) {
    throw new AppError(404, "NOT_FOUND", "Purchase not found");
  }

  await prisma.$transaction(async (tx) => {
    await tx.purchase.delete({
      where: { id },
    });

    await recalculateStock(existing.itemId, req.userId!, tx);
  });

  res.json({ data: { message: "Purchase deleted" } });
});

export default router;

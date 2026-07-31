import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

/**
 * Recompute an item's current stock from purchase and consumption history.
 *
 * Stock is derived (never stored incrementally): purchases add quantity in
 * the purchase unit, consumption is converted to the purchase unit using the
 * item's conversionRate (`consumedQty / conversionRate`), and the result is
 * clamped at zero. This avoids fragile manual subtraction chains.
 *
 * @param itemId The pantry item to recompute stock for.
 * @param userId Owner of the item (ownership is enforced here).
 * @param tx     Optional transaction client. MUST be passed when called
 *               inside a prisma.$transaction so the caller's uncommitted
 *               changes are visible; defaults to the global client.
 * @returns The new currentQuantity.
 * @throws AppError 404 if the item is missing or not owned by userId.
 */
export async function recalculateStock(itemId: string, userId: string, tx?: Prisma.TransactionClient) {
  const client = tx ?? prisma;

  const item = await client.pantryItem.findUnique({
    where: { id: itemId },
  });

  if (!item || item.userId !== userId) {
    throw new AppError(404, "NOT_FOUND", "Pantry item not found");
  }

  const purchaseAgg = await client.purchase.aggregate({
    where: { itemId, userId },
    _sum: { quantity: true },
  });

  const consumptionAgg = await client.consumptionItem.aggregate({
    where: {
      itemId,
      completion: {
        userId,
        undoneAt: null,
      },
    },
    _sum: { quantity: true },
  });

  const purchaseQty = purchaseAgg._sum.quantity?.toNumber() ?? 0;
  const consumptionQty = consumptionAgg._sum.quantity?.toNumber() ?? 0;
  const consumedInPurchaseUnit = consumptionQty / item.conversionRate.toNumber();
  const currentQuantity = Math.max(0, purchaseQty - consumedInPurchaseUnit);

  await client.pantryItem.update({
    where: { id: itemId },
    data: { currentQuantity },
  });

  return currentQuantity;
}

/**
 * Guard against stock going negative.
 *
 * @throws AppError 400 if the item's current quantity is already negative.
 */
export async function validateStockNonNegative(itemId: string, userId: string) {
  const item = await prisma.pantryItem.findUnique({
    where: { id: itemId },
  });

  if (!item || item.userId !== userId) {
    throw new AppError(404, "NOT_FOUND", "Pantry item not found");
  }

  if (item.currentQuantity.toNumber() < 0) {
    throw new AppError(400, "NEGATIVE_STOCK", `Stock for "${item.name}" would become negative`);
  }
}

/**
 * Guard against a purchase overflowing the item's capacity.
 *
 * @param addedQuantity Quantity (in purchase unit) the caller intends to add.
 * @throws AppError 409 CAPACITY_EXCEEDED when current + added > capacity,
 *         with current/capacity/maxAdditional in the details. Clients may
 *         resend with override:true to bypass.
 */
export async function validateCapacity(itemId: string, addedQuantity: number, userId: string) {
  const item = await prisma.pantryItem.findUnique({
    where: { id: itemId },
  });

  if (!item || item.userId !== userId) {
    throw new AppError(404, "NOT_FOUND", "Pantry item not found");
  }

  if (item.capacityQuantity.toNumber() === 0) return;

  const newTotal = item.currentQuantity.toNumber() + addedQuantity;
  if (newTotal > item.capacityQuantity.toNumber()) {
    throw new AppError(409, "CAPACITY_EXCEEDED", `Purchase would exceed capacity (${item.capacityQuantity} ${item.unit.toLowerCase()})`, {
      currentQuantity: item.currentQuantity,
      capacityQuantity: item.capacityQuantity,
      maxAdditional: item.capacityQuantity.toNumber() - item.currentQuantity.toNumber(),
    });
  }
}

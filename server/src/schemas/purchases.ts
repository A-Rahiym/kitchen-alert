import { z } from "zod";

export const createPurchaseSchema = z.object({
  itemId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  quantity: z.number().positive(),
  amount: z.number().positive(),
  override: z.boolean().optional(),
});

export const updatePurchaseSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  quantity: z.number().positive().optional(),
  amount: z.number().positive().optional(),
  override: z.boolean().optional(),
});

export const purchaseIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export const purchaseQuerySchema = z.object({
  itemId: z.string().uuid().optional(),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be YYYY-MM").optional(),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
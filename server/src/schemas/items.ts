import { z } from "zod";

const itemUnitSchema = z.enum(["KG", "G", "L", "ML", "PIECE", "PACK"]);
const consumptionUnitSchema = z.enum(["TEASPOON", "TABLESPOON", "CUP", "PIECE", "ML", "MINUTE"]);

export const createItemSchema = z.object({
  name: z.string().min(1).max(100),
  icon: z.string().min(1).max(50),
  unit: itemUnitSchema,
  consumptionUnit: consumptionUnitSchema,
  conversionRate: z.number().positive(),
  capacityQuantity: z.number().positive(),
  currentQuantity: z.number().min(0).default(0),
  lowStockQuantity: z.number().min(0).optional(),
  thresholdDays: z.number().int().min(0).optional(),
  frequency: z.number().int().min(0).optional(),
  people: z.number().int().min(0).optional(),
});

export const updateItemSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  icon: z.string().min(1).max(50).optional(),
  unit: itemUnitSchema.optional(),
  consumptionUnit: consumptionUnitSchema.optional(),
  conversionRate: z.number().positive().optional(),
  capacityQuantity: z.number().positive().optional(),
  currentQuantity: z.number().min(0).optional(),
  lowStockQuantity: z.number().min(0).optional(),
  thresholdDays: z.number().int().min(0).optional(),
  frequency: z.number().int().min(0).optional(),
  people: z.number().int().min(0).optional(),
});

export const itemIdParamsSchema = z.object({
  id: z.string().uuid(),
});

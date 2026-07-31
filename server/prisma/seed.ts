import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst();
  if (existing) {
    console.log("Seed data already exists, skipping");
    return;
  }

  const passwordHash = await argon2.hash("password123");

  const user = await prisma.user.create({
    data: {
      email: "dev@kitchenalert.com",
      name: "Dev User",
      passwordHash,
    },
  });

  const gas = await prisma.pantryItem.create({
    data: {
      userId: user.id,
      name: "Cooking Gas",
      icon: "gas",
      unit: "KG",
      consumptionUnit: "MINUTE",
      conversionRate: 120,
      capacityQuantity: 12.5,
      currentQuantity: 8,
      lowStockQuantity: 2,
      thresholdDays: 7,
      frequency: 3,
      people: 4,
    },
  });

  const eggs = await prisma.pantryItem.create({
    data: {
      userId: user.id,
      name: "Eggs",
      icon: "egg",
      unit: "PACK",
      consumptionUnit: "PIECE",
      conversionRate: 30,
      capacityQuantity: 30,
      currentQuantity: 15,
      lowStockQuantity: 5,
      thresholdDays: 3,
      frequency: 2,
      people: 3,
    },
  });

  const rice = await prisma.pantryItem.create({
    data: {
      userId: user.id,
      name: "Rice",
      icon: "rice",
      unit: "KG",
      consumptionUnit: "CUP",
      conversionRate: 5,
      capacityQuantity: 50,
      currentQuantity: 35,
      lowStockQuantity: 5,
      thresholdDays: 14,
      frequency: 3,
      people: 4,
    },
  });

  const flour = await prisma.pantryItem.create({
    data: {
      userId: user.id,
      name: "Flour",
      icon: "flour",
      unit: "KG",
      consumptionUnit: "CUP",
      conversionRate: 8,
      capacityQuantity: 25,
      currentQuantity: 12,
      lowStockQuantity: 3,
      thresholdDays: 10,
      frequency: 2,
      people: 4,
    },
  });

  const oil = await prisma.pantryItem.create({
    data: {
      userId: user.id,
      name: "Vegetable Oil",
      icon: "oil",
      unit: "L",
      consumptionUnit: "ML",
      conversionRate: 1000,
      capacityQuantity: 5,
      currentQuantity: 3.5,
      lowStockQuantity: 1,
      thresholdDays: 14,
      frequency: 3,
      people: 4,
    },
  });

  const kerosene = await prisma.pantryItem.create({
    data: {
      userId: user.id,
      name: "Kerosene",
      icon: "kerosene",
      unit: "L",
      consumptionUnit: "MINUTE",
      conversionRate: 180,
      capacityQuantity: 4,
      currentQuantity: 2,
      lowStockQuantity: 0.5,
      thresholdDays: 5,
      frequency: 2,
      people: 3,
    },
  });

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  await prisma.purchase.createMany({
    data: [
      { userId: user.id, itemId: gas.id, date: new Date(`${year}-${month}-01`), quantity: 12.5, amount: 20000 },
      { userId: user.id, itemId: gas.id, date: new Date("2026-05-10"), quantity: 12.5, amount: 18500 },
      { userId: user.id, itemId: eggs.id, date: new Date(`${year}-${month}-03`), quantity: 30, amount: 4500 },
      { userId: user.id, itemId: eggs.id, date: new Date("2026-05-20"), quantity: 30, amount: 4200 },
      { userId: user.id, itemId: rice.id, date: new Date(`${year}-${month}-05`), quantity: 50, amount: 85000 },
      { userId: user.id, itemId: rice.id, date: new Date("2026-04-15"), quantity: 50, amount: 82000 },
      { userId: user.id, itemId: flour.id, date: new Date(`${year}-${month}-02`), quantity: 25, amount: 32000 },
      { userId: user.id, itemId: flour.id, date: new Date("2026-05-25"), quantity: 25, amount: 30000 },
      { userId: user.id, itemId: oil.id, date: new Date(`${year}-${month}-08`), quantity: 5, amount: 15000 },
      { userId: user.id, itemId: kerosene.id, date: new Date(`${year}-${month}-10`), quantity: 4, amount: 6000 },
      { userId: user.id, itemId: kerosene.id, date: new Date("2026-05-28"), quantity: 4, amount: 5500 },
    ],
  });

  console.log("Seed complete — dev user, 6 pantry items, 11 purchases created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

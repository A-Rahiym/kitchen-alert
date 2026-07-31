import { describe, it, expect, beforeAll } from "vitest";

const BASE = "http://localhost:3000";
let token = "";
let itemId = "";
let purchaseId = "";

/*
 * Purchase CRUD endpoints + inventory stock recalculation
 *
 * Validates that creating a purchase adds to the item's current quantity
 * and that deleting one safely recalculates stock from history. Tests
 * the capacity overflow guard (409 with optional override), validation
 * of zero/negative quantities, filtered listing, pagination, and the
 * require-auth guard on the whole endpoint group.
 */
describe("purchases endpoints", () => {
  /* Register a user and create a pantry item to attach purchases to */
  beforeAll(async () => {
    const email = `purch-test-${Date.now()}@example.com`;
    const reg = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "password123" }),
    });
    const regBody = await reg.json();
    token = regBody.data.accessToken;

    const item = await fetch(`${BASE}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: "Purchase Test Item",
        icon: "gas",
        unit: "KG",
        consumptionUnit: "MINUTE",
        conversionRate: 120,
        capacityQuantity: 100,
        currentQuantity: 0,
      }),
    });
    const itemBody = await item.json();
    itemId = itemBody.data.id;
  });

  /* Create a purchase — expects 201, stock should increase to 20 */
  it("POST /purchases — creates purchase and updates stock", async () => {
    const res = await fetch(`${BASE}/purchases`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        itemId,
        date: "2026-07-28",
        quantity: 20,
        amount: 50000,
      }),
    });
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.data.purchase.itemId).toBe(itemId);
    expect(body.data.currentQuantity).toBe("20");
    purchaseId = body.data.purchase.id;
  });

  /* Exceed the item's capacity without override — expects 409 */
  it("POST /purchases — 409 on capacity exceeded", async () => {
    const res = await fetch(`${BASE}/purchases`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        itemId,
        date: "2026-07-28",
        quantity: 200,
        amount: 100000,
      }),
    });
    expect(res.status).toBe(409);
  });

  /* Same large quantity with override=true — expects 201 */
  it("POST /purchases — override=true bypasses capacity", async () => {
    const res = await fetch(`${BASE}/purchases`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        itemId,
        date: "2026-07-28",
        quantity: 200,
        amount: 100000,
        override: true,
      }),
    });
    expect(res.status).toBe(201);
  });

  /* Send quantity=0 — expects 400 */
  it("POST /purchases — 400 on zero quantity", async () => {
    const res = await fetch(`${BASE}/purchases`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        itemId,
        date: "2026-07-28",
        quantity: 0,
        amount: 0,
      }),
    });
    expect(res.status).toBe(400);
  });

  /* List purchases — expects 200 with array and pagination meta */
  it("GET /purchases — lists purchases", async () => {
    const res = await fetch(`${BASE}/purchases`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.meta).toHaveProperty("page");
    expect(body.meta).toHaveProperty("total");
  });

  /* Filter purchases by itemId — expects 200, all results match */
  it("GET /purchases — filters by itemId", async () => {
    const res = await fetch(`${BASE}/purchases?itemId=${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.every((p: any) => p.itemId === itemId)).toBe(true);
  });

  /* Filter purchases by month — expects 200 */
  it("GET /purchases — filters by month", async () => {
    const res = await fetch(`${BASE}/purchases?month=2026-07`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
  });

  /* Paginate with pageSize=1 — expects at most 1 item per page */
  it("GET /purchases — paginates", async () => {
    const res = await fetch(`${BASE}/purchases?page=1&pageSize=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.length).toBeLessThanOrEqual(1);
    expect(body.meta.pageSize).toBe(1);
  });

  /* Fetch a single purchase by UUID — expects 200 */
  it("GET /purchases/:id — returns purchase", async () => {
    const res = await fetch(`${BASE}/purchases/${purchaseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.id).toBe(purchaseId);
  });

  /* Update purchase amount — expects 200 with updated value */
  it("PUT /purchases/:id — updates purchase", async () => {
    const res = await fetch(`${BASE}/purchases/${purchaseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount: 60000 }),
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.purchase.amount).toBe("60000");
  });

  /* Delete a purchase — expects 200 and verifies stock was recalculated */
  it("DELETE /purchases/:id — removes purchase and recalculates stock", async () => {
    const res = await fetch(`${BASE}/purchases/${purchaseId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);

    const itemRes = await fetch(`${BASE}/items/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const itemBody = await itemRes.json();
    expect(Number(itemBody.data.currentQuantity)).toBeLessThan(20);
  });

  /* Fetch the deleted purchase — expects 404 */
  it("GET /purchases/:id — 404 after delete", async () => {
    const res = await fetch(`${BASE}/purchases/${purchaseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(404);
  });

  /* Access purchases without a bearer token — expects 401 */
  it("GET /purchases — 401 without token", async () => {
    const res = await fetch(`${BASE}/purchases`);
    expect(res.status).toBe(401);
  });
});

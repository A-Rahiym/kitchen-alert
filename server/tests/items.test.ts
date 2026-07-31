import { describe, it, expect, beforeAll } from "vitest";

const BASE = "http://localhost:3000";
let token = "";
let itemId = "";

/*
 * Pantry item CRUD endpoints
 *
 * Validates the full lifecycle of a pantry item: create with valid data,
 * reject incomplete payloads, list all items, fetch by ID, return 404
 * for nonexistent IDs, update fields, and soft-delete by zeroing quantity.
 * All operations require a valid bearer token obtained at registration.
 */


describe("items endpoints", () => {
  /* Register a fresh user before any item tests */
  beforeAll(async () => {
    const email = `items-test-${Date.now()}@example.com`;
    const res = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "password123" }),
    });
    const body = await res.json();
    token = body.data.accessToken;
  });

  /* Create a full pantry item — expects 201 with the returned object */
  it("POST /items — creates an item", async () => {
    const res = await fetch(`${BASE}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: "Test Rice",
        icon: "rice",
        unit: "KG",
        consumptionUnit: "CUP",
        conversionRate: 5,
        capacityQuantity: 50,
        currentQuantity: 10,
      }),
    });
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.data.name).toBe("Test Rice");
    expect(body.data.unit).toBe("KG");
    itemId = body.data.id;
  });

  /* Create with missing required fields — expects 400 */
  it("POST /items — 400 on missing fields", async () => {
    const res = await fetch(`${BASE}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: "Incomplete" }),
    });
    expect(res.status).toBe(400);
  });

  /* Fetch all items for the authenticated user — expects 200 with an array */
  it("GET /items — lists items", async () => {
    const res = await fetch(`${BASE}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThanOrEqual(1);
  });

  /* Fetch a single item by UUID — expects 200 with the matching item */
  it("GET /items/:id — returns item", async () => {
    const res = await fetch(`${BASE}/items/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.id).toBe(itemId);
  });

  /* Fetch with a UUID that doesn't exist — expects 404 */
  it("GET /items/:id — 404 for wrong id", async () => {
    const res = await fetch(`${BASE}/items/00000000-0000-0000-0000-000000000000`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(404);
  });

  /* Update item name — expects 200 with the updated object */
  it("PUT /items/:id — updates item", async () => {
    const res = await fetch(`${BASE}/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: "Test Rice Updated" }),
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.name).toBe("Test Rice Updated");
  });

  /* Soft-delete by setting quantity to zero — expects 200 */
  it("DELETE /items/:id — zeroes quantity (soft-delete)", async () => {
    const res = await fetch(`${BASE}/items/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.message).toBeTruthy();
  });
});

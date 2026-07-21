import { describe, it, expect } from "vitest";

describe("health endpoint", () => {
  it("returns ok status", async () => {
    const res = await fetch("http://localhost:3000/health");
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body).toHaveProperty("status");
  });
});

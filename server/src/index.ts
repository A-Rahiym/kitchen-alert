import express from "express";
import helmet from "helmet";
import cors from "cors";
import { apiReference } from "@scalar/express-api-reference";
import { config } from "./config";
import { prisma } from "./lib/prisma";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";
import purchaseRoutes from "./routes/purchases";
import openapiSpec from "./config/openapi.json";

const app: express.Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/docs", apiReference({ content: openapiSpec }));

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

export default app;
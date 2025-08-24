
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ticketRoutes from "./routes/tickets.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/healthz", (_req, res) => res.json({ status: "ok" }));

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

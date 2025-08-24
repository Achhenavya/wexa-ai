
import express from "express";
import Ticket from "../models/Ticket.js";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
router.get("/", async (_req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
export default router;

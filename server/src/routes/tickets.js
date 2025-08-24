import express from "express";
import Ticket from "../models/Ticket.js";
import { classifyTicket, draftReply } from "../services/agent.js";
import Article from "../models/Article.js";
import AgentSuggestion from "../models/AgentSuggestion.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    // Run agent triage
    const { predictedCategory, confidence } = classifyTicket(ticket.description);
    const articles = await Article.find({ tags: predictedCategory }).limit(3);
    const draft = draftReply(ticket, articles);
    const suggestion = await AgentSuggestion.create({
      ticketId: ticket._id,
      predictedCategory,
      articleIds: articles.map(a => a._id),
      draftReply: draft.draftReply,
      confidence,
      autoClosed: confidence >= (process.env.CONFIDENCE_THRESHOLD || 0.75)
    });
    res.json({ ticket, suggestion });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

router.get("/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.json(ticket);
});

export default router;

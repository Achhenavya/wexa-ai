import express from "express";
import AgentSuggestion from "../models/AgentSuggestion.js";

const router = express.Router();

router.get("/suggestion/:ticketId", async (req, res) => {
  const suggestion = await AgentSuggestion.findOne({ ticketId: req.params.ticketId });
  res.json(suggestion);
});

export default router;

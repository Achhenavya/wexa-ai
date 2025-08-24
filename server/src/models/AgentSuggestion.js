import mongoose from "mongoose";
const suggestionSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
  predictedCategory: String,
  articleIds: [String],
  draftReply: String,
  confidence: Number,
  autoClosed: Boolean,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("AgentSuggestion", suggestionSchema);

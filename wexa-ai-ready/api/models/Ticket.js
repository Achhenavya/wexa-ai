
import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["open", "in_progress", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Ticket", ticketSchema);

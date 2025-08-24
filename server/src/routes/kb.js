import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query || "";
  const articles = await Article.find({ $or: [
    { title: { $regex: query, $options: "i" } },
    { body: { $regex: query, $options: "i" } },
    { tags: { $regex: query, $options: "i" } }
  ]});
  res.json(articles);
});

router.post("/", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(article);
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;

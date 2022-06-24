const express = require("express");
const { Article, validateArticle } = require("../models/article");

const router = express.Router();

router.get("/all", async (req, res) => {
  const articles = await Article.find().select();

  res.send(articles);
});

router.get("/", async (req, res) => {
  const articles = await Article.find().select({ articleBody: 0 });

  res.send(articles);
});

router.get("/category", async (req, res) => {
  const articles = await Article.find({ category: req.body.category }).select({
    articleBody: 0,
  });

  res.send(articles);
});

router.get("/author", async (req, res) => {
  const articles = await Article.find({ author: req.body.author }).select({
    articleBody: 0,
  });

  res.send(articles);
});

router.post("/post", async (req, res) => {
  const { title, author, category, articleBody } = req.body;

  const article = new Article({ title, author, category, articleBody });

  await article.save();
  res.send("article added successfully");
});

module.exports = router;

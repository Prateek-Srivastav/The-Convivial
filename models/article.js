const mongoose = require("mongoose");
const Joi = require("joi");

function validateArticle(article) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    articleBody: Joi.string().required(),
    images: Joi.array({
      image: Joi.string().uri(),
    }),
  });

  return schema.validate(article);
}

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    articleBody: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports.validate = validateArticle;
module.exports.articleSchema = articleSchema;
module.exports.Article = Article;

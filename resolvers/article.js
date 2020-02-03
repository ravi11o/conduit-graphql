const Article = require('../models/article');
const Comment = require('../models/comment');

module.exports = {
  Query: {
    articles: async () => {
      try {
        const articles = await Article.find();
        return articles;
      } catch (err) {
        throw err;
      }
    },
    article: async (_, { slug }) => {
      try {
        const article = Article.findOne({ slug });
        return article;
      } catch (error) {
        throw error;
      }
    },
    tags: async () => {
      try {
        const tags = await Article.distinct("tagList");
        return tags;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    createArticle: async(_, args) => {
      try {
        const article = await Article.create(args.input);
        return article;
      } catch (error) {
        throw error;
      }
    },
    updateArticle: async(_, args) => {
      try {
        const { title, description, body } = args.input;
        const article = await Article.findOne({slug: args.slug});
        title ? article.title = title : "";
        description ? article.description = description : "";
        body ? article.body = body : "";
        const updatedArticle = await article.save();
        return updatedArticle;
      } catch (error) {
        throw error;
      }
    },
    deleteArticle: async(_, args) => {
      try {
        const article = Article.findByIdAndDelete(args.id);
        return article;
      } catch (error) {
        throw error;
      }
    }
  },
  Article: {
    comments: async (parent) => {
      try {
        const comments = await Comment.find({article: parent.id});
        return comments;
      } catch (error) {
        throw error;
      }
    }
  }
}
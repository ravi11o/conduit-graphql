const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user');
const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated } = require('./middleware')

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
    createArticle: combineResolvers(isAuthenticated, async(_, args, {id}) => {
      try {
        args.input.author = id;
        const article = await Article.create(args.input);
        return article;
      } catch (error) {
        throw error;
      }
    }),
    updateArticle: combineResolvers(isAuthenticated, async(_, args) => {
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
    }),
    deleteArticle: combineResolvers(isAuthenticated, async(_, args) => {
      try {
        const article = Article.findByIdAndDelete(args.id);
        return article;
      } catch (error) {
        throw error;
      }
    }),
    favouriteArticle: combineResolvers(isAuthenticated, async (_, { slug }, {id}) => {
      const article = Article.findOneAndUpdate({slug}, {$push: {favourited: id}}, {new: true});
      return article;
    }),
    unfavouriteArticle: combineResolvers(isAuthenticated, async (_, { slug }, {id}) => {
      const article = Article.findOneAndUpdate({slug}, {$pull: {favourited: id}}, {new: true});
      return article;
    })
  },
  Article: {
    comments: async (parent) => {
      try {
        const comments = await Comment.find({article: parent.id});
        return comments;
      } catch (error) {
        throw error;
      }
    },
    author: async ({author}) => {
      const user = await User.findById(author);
      return user;
    }
  }
}
const Comment = require('../models/comment');
const Article = require('../models/article');

module.exports = {
  Query: {
    comments: async (_, {slug}) => {
      try {
        const article = await Article.findOne({slug});
        return  await Comment.find({article: article.id});
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    createComment: async (_, args) => {
      try {
        return await Comment.create(args);
      } catch (error) {
        throw error;
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        return await Comment.findByIdAndDelete(id);
      } catch (error) {
        throw error;
      }
    }
  }
}
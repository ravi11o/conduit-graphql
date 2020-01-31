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
    },
    singleComment: async (_, {id}) => {
      try {
        return await Comment.findById(id);
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    createComment: async (_, args) => {
      try {
        const comment = await Comment.create(args);
        await Article.findByIdAndUpdate(comment.article, {$push: {comments: comment.id}});
        return comment;
      } catch (error) {
        throw error;
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        const comment = await Comment.findByIdAndDelete(id);
        await Article.findByIdAndUpdate(comment.article, {$pull: {comments: comment.id}});
        return comment;
      } catch (error) {
        throw error;
      }
    }
  }
}
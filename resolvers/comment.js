const Comment = require('../models/comment');
const Article = require('../models/article');
const User = require('../models/user'); 
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./middleware');

module.exports = {
  Query: {
    comments: combineResolvers(isAuthenticated, async (_, {slug}) => {
      try {
        const article = await Article.findOne({slug});
        if(!article) throw new Error("Invalid slug");
        return  await Comment.find({article: article.id});
      } catch (error) {
        throw error;
      }
    }),
    singleComment: async (_, {id}) => {
      try {
        return await Comment.findById(id);
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    createComment: combineResolvers(isAuthenticated, async (_, args, {id}) => {
      try {
        args.author = id;
        const comment = await Comment.create(args);
        await Article.findByIdAndUpdate(comment.article, {$push: {comments: comment.id}});
        return comment;
      } catch (error) {
        throw error;
      }
    }),
    deleteComment: combineResolvers(isAuthenticated, async (_, { id }) => {
      try {
        const comment = await Comment.findByIdAndDelete(id);
        await Article.findByIdAndUpdate(comment.article, {$pull: {comments: comment.id}});
        return comment;
      } catch (error) {
        throw error;
      }
    })
  },
  Comment: {
    author: async ({author}) => {
      const user = User.findById(author);
      return user;
    }
  }
}
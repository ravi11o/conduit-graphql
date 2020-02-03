const { GraphQLDateTime } = require('graphql-iso-date');

const articleResolver = require('./article');
const commentResolver = require('./comment');
const userResolver = require('./user');


const customDateScalarResolver = {
  Date: GraphQLDateTime
}

module.exports = [
  customDateScalarResolver,
  articleResolver, 
  commentResolver,
  userResolver
]
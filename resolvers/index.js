const { GraphQLDateTime } = require('graphql-iso-date');

const articleResolver = require('./article');
const commentResolver = require('./comment');


const customDateScalarResolver = {
  Date: GraphQLDateTime
}

module.exports = [
  customDateScalarResolver,
  articleResolver, 
  commentResolver
]
const { gql } = require('apollo-server-express');
const articleTypeDefs = require('./article');
const commentTypeDefs = require('./comment');

const typeDefs = gql`
  scalar Date
  
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  articleTypeDefs,
  commentTypeDefs
]
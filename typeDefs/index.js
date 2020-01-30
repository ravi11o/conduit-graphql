const { gql } = require('apollo-server-express');
const articleTypeDefs = require('./article');

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  articleTypeDefs
]
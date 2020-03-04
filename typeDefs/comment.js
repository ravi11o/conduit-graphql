const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    comments(slug: String!):[Comment!]
    singleComment(id: ID!):Comment!
  }

  extend type Mutation {
    createComment(article: ID!, body: String!):Comment!
    deleteComment(id: ID!):Comment!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: Date!
    updatedAt: Date!
    author: Profile!
  }
`;
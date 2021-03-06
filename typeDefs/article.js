const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    articles: [Article!]
    article(slug: String!):Article 
  }

  extend type Mutation {
    createArticle(input: createArticleInput!):Article
    updateArticle(slug: String!, input: updateArticleInput!):Article
    deleteArticle(id: ID!):Article
    favouriteArticle(slug: String!):Article
    unfavouriteArticle(slug: String!):Article
  }

  input createArticleInput {
    title: String!
    body: String!
    description: String!
    tagList: [String!]
  }

  input updateArticleInput {
    title: String
    body: String
    description: String
  }

  type Article {
    id: ID!
    title: String!
    body: String!
    description: String!
    tagList: [String!]
    slug: String
    comments: [Comment!]
    createdAt: Date!
    updatedAt: Date!
    author: Profile!
  }
`;
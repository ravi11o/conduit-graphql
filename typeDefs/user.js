const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    register(input: registerUser): User!
    login(input: loginUser): User!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    bio: String
    image: String
    token: String
  }

  input registerUser {
    username: String!
    email: String!
    password: String!
  }

  input loginUser {
    email: String!
    password: String!
  }
`;
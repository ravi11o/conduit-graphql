const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    profile(username: String!):Profile
    currentUser: User
  }

  extend type Mutation {
    register(input: registerUser): User!
    login(input: loginUser): User!
    updateUser(input: updateUserField): User!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    bio: String
    image: String
    token: String
  }

  type Profile {
    username: String!
    bio: String
    image: String
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

  input updateUserField {
    email: String
    username: String
    password: String
    image: String
    bio: String
  }
`;
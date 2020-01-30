const express = require('express');
const  {gql, ApolloServer } = require('apollo-server-express');
const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!"
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app, path: '/graphql'});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
})
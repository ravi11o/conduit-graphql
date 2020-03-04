const express = require('express');
const  {gql, ApolloServer } = require('apollo-server-express');
const PORT = process.env.PORT || 4000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { verifyJWT } = require('./modules/auth');


const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Configure environment variable 
dotenv.config();

// Connect to mongodb database
mongoose.connect(process.env.MONGO_URI,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
},
(err) => {
  console.log('connected', err ? err : true);
});

const server = new ApolloServer(
  { 
    typeDefs, 
    resolvers,
    context: async ({ req }) => {
      await verifyJWT(req);
      return req.user;
    } 
  }
);

const app = express();

// middlewares
app.use(express.json());

server.applyMiddleware({ app, path: '/graphql'});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
});

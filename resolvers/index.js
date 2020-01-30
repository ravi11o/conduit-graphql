const articleResolver = require('./article');


const indexResolver = {
  Query: {
    hello: () => "Hello World!"
  }
}

module.exports = [
  indexResolver,
  articleResolver
]
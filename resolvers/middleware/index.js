const { skip } = require('graphql-resolvers')

module.exports = {
  isAuthenticated: (_, __, { email }) => {
    if(!email) {
      throw new Error("Login Required");
    }
    return skip;
  }
}
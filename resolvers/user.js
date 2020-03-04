const User = require('../models/user');
const auth = require('../modules/auth');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./middleware');


module.exports = {
  Query: {
    profile: combineResolvers(isAuthenticated, async (_, { username }) => {
      try {
        // console.log(email, "inside profile")
        const user = await User.findOne({ username });
        return user;
      } catch (error) {
        throw error;
      }
    }),
    currentUser: combineResolvers(isAuthenticated, async (_, __, { id, token }) => {
      try {
        const user = await User.findById(id);
        user.token = token;
        return user;
      } catch (error) {
        throw error;
      }
    })
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const user = await User.create(args.input);
        const token = await auth.generateJWT(user);
        user.token = token;
        return user;
      } catch (error) {
        throw error;
      }
      
    },
    login: async(_, { input }) => {
      try {
        const { email, password } = input;
        const user = await User.findOne({ email });
        if(!user) throw new Error("Email not registered");
        const match = await user.verifyPassword(password);
        if(!match) throw new Error("Incorrect password");
        const token = await auth.generateJWT(user);
        user.token = token;
        return user;
      } catch (error) {
        throw error;
      }
    },
    updateUser: combineResolvers(isAuthenticated, async (_, args, { id, token}) => {
      const { email, username, password, image, bio } = args.input;
    
      try {
        const user = await User.findById(id);
        email ? user.email = email : "";
        username ? user.username = username : "";
        password ? user.password = password : "";
        image ? user.image = image : "";
        bio ? user.bio = bio : "";
        const updatedUser = await user.save()
        return updatedUser;  
      } catch (error) {
        throw error;
      }
    })
  }
}
const User = require('../models/user');
const auth = require('../modules/auth');


module.exports = {
  Query: {
    profile: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        return user;
      } catch (error) {
        throw error;
      }
    }
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
    login: async(_, args) => {
      try {
        const { email, password } = args.input;
        const user = await User.findOne({ email });
        if(!user) throw "Email not registered";
        const match = await user.verifyPassword(password);
        if(!match) throw "Invalid password"
        const token = await auth.generateJWT(user);
        user.token = token;
        return user;
      } catch (error) {
        throw error;
      }
      
    }
  }
}
const jwt = require('jsonwebtoken');

module.exports = {
  generateJWT:  async (user) => {
    const payload = {id: user.id, email: user.email};
    const token = await jwt.sign(payload, process.env.SECRET);
    return token;
  },
  verifyJWT: async (req) => {
    req.user = {};
    const token = req.headers.authorization || '';
    try {
      if(token) {
        const { email, id } = await jwt.verify(token, process.env.SECRET);
        req.user = { email, id, token }
        
      }
    } catch (error) {
      throw error;
    }
    
  }
}
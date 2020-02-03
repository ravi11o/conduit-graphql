const jwt = require('jsonwebtoken');

module.exports = {
  generateJWT:  async (user) => {
    const payload = {id: user.id, email: user.email};
    const token = await jwt.sign(payload, process.env.SECRET);
    return token;
  }
}
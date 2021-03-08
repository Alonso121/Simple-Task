const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MONGOURI: process.env.MONGOURI,
  JWTSecret: process.env.JWT_SECRET,
};

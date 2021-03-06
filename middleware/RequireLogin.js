const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../config");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in to proceed" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWTSecret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};

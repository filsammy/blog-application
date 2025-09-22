const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  };
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
};

module.exports.verify = (req, res, next) => {

  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ auth: "Failed", message: "No token provided." });
  }

  // Assumes "Bearer <token>"
  token = token.slice(7);

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decodedToken) {
    if (err) {
      return res.status(401).send({ auth: "Failed", message: err.message });
    }
    req.user = decodedToken;
    next();
  });
};

module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({
      message: "Action Forbidden"
    })
  }

}
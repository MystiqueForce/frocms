const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  console.log("inside middle ware");
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // The Authorization header is present
    const token = authHeader.split(' ')[1];
    console.log(token);

    // Check if not token
    if (!token) {
      return res.status(403).json({ msg: "Authorization Denied" });
    }
  
    // Verify token
    try {
      //it is going to give use the user id (user:{id: user.id})
      const verify = jwt.verify(token, process.env.JWTSECRET);
  
      req.user = verify;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
    
  } else {
    // The Authorization header is not present
    res.status(401).send('Unauthorized');
  }
 
};
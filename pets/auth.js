const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  console.log('Token received:', token); // New line
  console.log('Secret used:', process.env.TOKEN_SECRET); // New line
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    
    console.log(req.user)  
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = verifyToken;
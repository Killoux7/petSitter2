const UserOwner = require('../models/ownerModel');
const Pet = require('../models/petModel');
const UserSitter = require ('../models/sitterModel')


function requireLogin(req, res, next) {
    if (!req.session.user) {
      res.status(401).json({ message: 'You must be logged in to access this route' });
    } else {
      next();
    }
  }

  module.exports = {
    requireLogin
  };
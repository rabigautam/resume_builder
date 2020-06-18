const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');

const otherHelper=require('../otherHelper');
const { SECRET_KEY } = require('../../config/index');
const authMiddleware = {};

authMiddleware.authentication = async (req, res, next) => {
    try {
      let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
      if (token && token.length) {
        token = token.replace('Bearer ', '');
        const data = await jwt.verify(token,SECRET_KEY );
        req.user = data;
        next();
      }else{
        return otherHelper.sendResponse(res, HttpStatus.FORBIDDEN, false, null, token, 'token not found', null);

      }
    } catch (err) {
      return otherHelper.sendResponse(res, HttpStatus.FORBIDDEN, false, null, null, 'token Expired', null);
  
      // return next(err);
    }
  };
  module.exports=authMiddleware;

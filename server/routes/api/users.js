const express = require('express');
const passport = require('passport');
const router = express.Router();
const userModule=require('../../modules/user/userController');
const {authentication}=require('../../helpers/authorization/authMiddleware');

router.get('/', userModule.test);
router.get('/',authentication, userModule.getUsers);
router.post('/register', userModule.register);
router.post('/login', userModule.login);
// router.post('/login/google/', passport.authenticate('google-token'), userModule.loginGOath);
router.post('/login/facebook',  passport.authenticate('facebook-token'), userModule.loginOauth);


module.exports = router;

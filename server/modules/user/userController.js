const userSch = require('./userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./userConfig');
const keyConfig = require('../../config/index')
const otherHelper=require('../../helpers/otherHelper');
const httpStatus = require('http-status');
const userController = {};
userController.test=async (req,res,next)=>{
   try{
    const user = await userSch.find({});
       res.json(user);
   }catch(err){
       next(err);
   }
}
userController.register = async (req, res, next) => {
    try{
//         const newUser = new userSch({ name, email: email.toLowerCase(),  gender });
//         const userSave = await newUser.save();
// console.log(userSave);
        const user = await userSch.findOne({ email: req.body.email.toLowerCase() });
        const { name,password,gender,password1 } = req.body;
        if (user) {
          const errors = { email: 'Email already exists' };
          const data = { email: req.body.email };
          return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
        } else {
          if (!password1) {
            const err = { password1: 'Field Empty' };
            return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, err, 'Field Empty', null);
          }
      
          if (password != password1) {
            const err = { password1: 'Password Mismatch' };
            return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, err, 'Password Mismatch', null);
          }
          const newUser = new userSch({ name, email: email.toLowerCase(),  gender });
          bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
              if (err) throw err;
              console.log(hash);
              newUser.password = hash;
              const userSave = await newUser.save();
              const payload = {
                id: userSave._id,
                name: userSave.name,
                email: userSave.email,
                gender: userSave.gender,
              };
               // Sign Token
        let token = jwt.sign(payload, keyConfig.SECRET_KEY, {
            expiresIn: tokenExpireTime,
          });
          token = `Bearer ${token}`;
         
              return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, msg, token);
            });
          });
        }
    
    }catch(err){
        next(err);
    }
};
userController.Login = async (req, res, next) => {
    try {
      let errors = {};
      let email = req.body.email.toLowerCase();
      const {
        body: { password },
      } = req;
      userSch.findOne({ email }).then((user) => {
        if (!user) {
          errors.email = 'User not found';
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, errors, errors.email, null);
        }
  
        // Check Password
        bcrypt.compare(password, user.password).then(async (isMatch) => {
          if (isMatch) {
       
         
            let payload = {
              id: user._id,
              name: user.name,
              email: user.email,
              email_verified: user.email_verified,
              gender: user.gender,
            };
            // Sign Token
            jwt.sign(
              payload,
              config.SECRET_KEY,
              {
                expiresIn: tokenExpireTime,
              },
              (err, token) => {
                token = `Bearer ${token}`;
              
                return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Login Success', token);
              },
            );
          } else {
            errors.password = 'Password incorrect';
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.password, null);
          }
        });
      });
    } catch (err) {
      next(err);
    }
  }
  userController.loginOauth = async (req, res, next) => {
    const profile = req.user;
    let user = await userSch.findOne({ email: profile.email });
    if (user) {
    } else {
      const randomPassword = await otherHelper.generateRandomHexString(12);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(randomPassword, salt);
  
      const newUser = new userSch({
        name: profile.name,
        email: profile.email.toLowerCase(),
        password: hash,
        email_verified: true,
        // avatar: profile.picture,
        register_method: profile.provider,
      });

      userSave = await newUser.save();
  
    
  
    }

  
 
    let payload = {
      id: userSave._id,
      name: userSave.name,
      avatar: userSave.avatar,
      email: userSave.email,
      email_verified: userSave.email_verified,
      gender: userSave.gender,
    };
  

    // Sign Token
    let token = jwt.sign(payload, config.SECRET_KEY, {
      expiresIn: tokenExpireTime,
    });
    token = `Bearer ${token}`;
   
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Register Successfully', token);
  };
  
module.exports=userController;
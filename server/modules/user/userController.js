const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./userConfig');
const keyConfig = require('../../config/index')
const otherHelper=require('../../helpers/otherHelper');
const httpStatus = require('http-status');
const userSch = require('./userSchema');
const userController = {};
userController.test = async (req,res,next)=>{
   try{
       res.json({hello:"world"});
   }catch(err){
       next(err);
   }
}
userController.register = async (req, res, next) => {
    try{
        const user = await userSch.findOne({ email: req.body.email.toLowerCase() });
        let data = req.body;
        if (user) {
          const errors = { email: 'Email already exists' };
          const data = { email: req.body.email };
          return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
        } else {
          if (!data.password1) {
            const err = { password1: 'Field Empty' };
            return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, err, 'Field Empty', null);
          }
      
          if (data.password != data.password1) {
            const err = { password1: 'Password Mismatch' };
            return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, err, 'Password Mismatch', null);
          }
       
          const generateHash = async (password) =>{
            try {
              const saltRound = 10;
              const salt = await bcrypt.genSalt(saltRound);
              const hashedPassword = await bcrypt.hash(password, salt);
              return hashedPassword;
            } catch (err) {
              next(err);
            }
          };
         const generated = await generateHash(data.password);
          data.password=generated;
          const newUser=  new userSch(data);
          const userSave= await newUser.save();
          if(userSave&&userSave._id){
            const payload = {
                id: userSave._id,
                name: userSave.name,
                email: userSave.email,
                gender: userSave.gender,
              };
               // Sign Token
        let token = jwt.sign(payload, keyConfig.SECRET_KEY, {
            expiresIn: keyConfig.tokenExpireTime,
          });
          token = `Bearer ${token}`;
         
        return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'registered', token);
        }
         
       
        }
    
    }catch(err){
        next(err);
    }
};
userController.login = async (req, res, next) => {
    try {
      let errors = {};
      let{password,email}=req.body;
      console.log(password)
      const user=await userSch.findOne({email:email.toLowerCase()});
      if (!user) {
        errors.email = 'User not found';
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, errors, errors.email, null);
      }else{
        console.log(user.password);

        let isMatch= await  bcrypt.compare(password, user.password);
        if(isMatch){
            let payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                // email_verified: user.email_verified,
                gender: user.gender,
              };
        // Sign Token
        let token = jwt.sign(payload, keyConfig.SECRET_KEY, {
            expiresIn: keyConfig.tokenExpireTime,
          });
          token = `Bearer ${token}`;
          return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Login Success', token);
        }else{
            errors.password = 'Password incorrect';
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.password, null);

        }
      }
    
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
  userController.getUsers= async (req, res, next) => {
    try {
   
      let userData = await userSch.find();
      return otherHelper.sendResponse(res, httpStatus.OK, true, userData, null, 'get', null);
  
    } catch (err) {
      next(err);
    }
  };
  
module.exports=userController;
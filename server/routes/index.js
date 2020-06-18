const express = require('express');
const router = express.Router();

const userRoutes = require('./api/users');
router.use('/user', userRoutes);

const resumeInfoRoutes = require('./api/resumeInfo');
router.use('/resumeinfo', resumeInfoRoutes);
module.exports=router;
// const templateRoutes = require('./api/templates');
// router.use('/templates', templateRoutes);
// module.exports = router;

const express = require('express');
const router = express.Router();
const userModule=require('../../modules/user/userController');
/**
 * @route GET api/user/test
 * @description Tests users route
 * @access Public
 */
// router.get('/', userModule.test);
router.post('/', userModule.test);


module.exports = router;

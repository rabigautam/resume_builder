const express = require('express');
const router = express.Router();
const resumeInfoModule=require('../../modules/resumeInfo/resumeInfoController');

router.get('/', resumeInfoModule.getResume);
router.post('/', resumeInfoModule.postResume);
router.get('/:id',resumeInfoModule.getResumeById);


module.exports = router;

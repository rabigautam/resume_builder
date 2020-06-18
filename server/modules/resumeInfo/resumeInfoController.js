const resumeInfoSchema = require("./resumeInfoSchema");
const resumeInfoSch=require('./resumeInfoSchema')
const resumeInfoController ={};
const keyConfig = require('../../config/index')
const otherHelper=require('../../helpers/otherHelper');
const httpStatus = require('http-status');

resumeInfoController.postResume=async(req,res,next)=>{
    try{
        let data= req.body;
        if(data._id){
            data.updated_at=new Date();
            const updateResume = await resumeInfoSch.findOneAndUpdate({ _id: data._id},{$set:data},{new:true} );
            return otherHelper.sendResponse(res, httpStatus.OK, true, updateResume, null, 'update', null);
        }else{
            const newResume=  new resumeInfoSch(data);
            const saveResume= await newResume.save();
            return otherHelper.sendResponse(res, httpStatus.OK, true, saveResume, null, 'saved', null);
        }
    }catch(err){
        next(err);
    }
  
};
resumeInfoController.getResumeById = async (req, res, next) => {
    try {
      let selectq = '';
      const resumeData = await resumeInfoSch.findOne({ _id: id, is_deleted: false }).select(selectq);
      return otherHelper.sendResponse(res, httpStatus.OK, true, resumeData, null, 'saved', null);
    } catch (err) {
      next(err);
    }
  };
  resumeInfoController.getResume= async (req, res, next) => {
    try {
   
      let resumeData = await resumeInfoSch.find();
      return otherHelper.sendResponse(res, httpStatus.OK, true, resumeData, null, 'get', null);
  
    } catch (err) {
      next(err);
    }
  };
  module.exports=resumeInfoController
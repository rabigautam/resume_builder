const userController = {};
userController.test=(req,res,next)=>{
   try{
       let data= req.body;
       console.log(req);
       res.json(data);
   }catch(err){
       next(err);
   }
}
module.exports=userController;
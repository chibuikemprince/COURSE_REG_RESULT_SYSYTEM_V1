var ResultModel  = require("../models/resultmodel");
var User  = require("../models/students");
    
 var getresult = async function(req, res, next){
        const {regno,password,session,semester} = req.body
      var EachErroMsg = "";
for(var e in req.body){
			if(req.body[e]==undefined){
			EachErroMsg  += e+" is required. "
				
			}
			
		}


        try {
			
			if(EachErroMsg.length>0){
				throw new Error(EachErroMsg);
			}
			
            const user_f = await User.findOne({regno:regno,password:password}) 
//console.log(user_f)
            //'',

if(user_f){
   
         await ResultModel.find({semester:semester,regno:regno,session:session}
		
		, function(err,courseExist_m){
			//console.log({semester:semester,regno:regno,session:session});
			//console.log(err);
			if(!courseExist_m){
            return res.status(404).json({
                message: 'Result not found',
				error:false
            })
        }
        else{
			
			
            res.status(200).json({
                message: "result found",
                data: courseExist_m,
				error:false
            
            })



        }
			
		}
		)

        


  
       


}



else{
    return res.status(404).json({
        message: 'account not found, kindly login to your account',
        statusCode: 404
    })
}





        } catch (error) {
            
  return res.status(404).json({
        message: 'Error found. ',
        statusCode: 400,
		"error":false
    })
			
        }



        
    }

 


module.exports =  getresult;
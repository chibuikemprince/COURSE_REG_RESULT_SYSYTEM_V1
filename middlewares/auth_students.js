var User  = require("../models/students");

var Service  = require("../Helpers/service");




    async function  signIn  (req, res, next){
        const {regno, password} = req.body
//console.log(regno," - ",password);
        
        try {
            const user_f = await User.findOne( {regno:regno} ) 
//console.log(password," - ",user_f.password)
            

if(user_f!=null){
                     
    if(password == user_f.password){
         
        return res.status(200).json({
            message: 'Student authenticated',
			name:user_f.surname+" "+user_f.firstname+" "+user_f.lastname,
			dept:user_f.dept,
			level:user_f.level,
            
            statusCode: 200
        })
    }else{
        return res.status(401).json({
            message: 'Invalid password'
        })
    }

}
else{
    return res.status(404).json({
        message: ' Student('+regno+') not registered.',
        statusCode: 404
    })
}





        } catch (error) {
            return Service.Error(error,next)
        }
    }

    
   async function  logIn (req, res, next){
        const {regno, password} = req.body

        
        try {
            const user_f = await User.findOne( {regno:regno} ) 
//console.log(user_f)
            

if(user_f){
                     
    if(password == user_f.password){
          req.body.name= user_f.surname+" "+user_f.firstname+" "+user_f.lastname;
      
        next()
        
    }else{
        return res.status(401).json({
            message: 'Invalid password'
        })
    }

}else{
    return res.status(404).json({
        message: ' Student('+regno+') not registered',
        statusCode: 404
    })
}





        } catch (error) {
            return Service.Error(error,next)
        }
    }

    


 
module.exports = {signin:signIn,login:logIn};
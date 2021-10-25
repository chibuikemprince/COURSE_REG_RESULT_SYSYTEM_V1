 
class Service {
     
    static Error (err, next){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

 

}


module.exports =  Service;

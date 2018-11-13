var express = require('express');
var router = express.Router();


/*
 This is the function that is going to be responsible making the api calls to the sportify api using express
*/

export function sendToApi(baseurl:string , dataType:string ,data?:object){
    
    const response = router.get('/', function(req,res){    
        try {
              return res.json({
                    url: baseurl,
                    dataType: dataType,
                    data: data
            });    
        } catch (error) {
            return res.status().json({
			message: error.message,
			error: true
		});
        }   
    });
    return response;
}
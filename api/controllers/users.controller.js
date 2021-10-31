const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

module.exports.addUser= function(req, res){
    console.log(req.body);

    bcrypt.genSalt(10, function(err, salt){
        if(err){
            console.log(err);
        }
        else{
            bcrypt.hash(req.body.password, salt, function(err, hashPassword){
                if(err){
                    console.log("password, salt", req.body.password);
                    console.log(err);
                }
                else{
                    const newUser={
                        username : req.body.username,
                        password:hashPassword,
                        name: req.body.name
                       }
                       User.create(newUser, function(err, response){
                           if(err){
                               console.log(err);
                           }
                           else{
                               console.log("user created");
                           }
                           res.status(200).json({"message": "user created"});
                       })
                }
            });
        }
    });
}
    
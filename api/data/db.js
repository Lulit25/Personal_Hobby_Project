const mongoose = require('mongoose');
require("dotenv").config({"path":".env"});
require('./travel-model.js');
require('./user-model.js')
const dbURL = process.env.DB_URL+process.env.DATABASE_NAME;

mongoose.connect(dbURL);

mongoose.connection.on("connected", function(){
    console.log("Connected to database");
});

mongoose.connection.on("disconnected", function(){
    console.log("Disconnected from database");
})

mongoose.connection.on("error", function(){
    console.log("Error connecting to database");
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("terminated by application");
        process.exit(0);
    });
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("terminated by application");
        process.exit(0);
    });
});

process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("terminated by application");
        process.kill(process.pid, "SIGUSR2");
    })
   
})
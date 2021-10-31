const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    star:{
        type:String
    }
});

const travelSchema = new mongoose.Schema({
    destination: {
        type: String, 
        required: true
    },

    averageTicketPrice:{
        type:Number
    },

    distance:{
        type:Number
    }, 
    hotels: [hotelSchema]

 });

 mongoose.model("Travel", travelSchema, "travelCollection");
require("dotenv").config({"path":".env"});
const express = require("express");
const path = require("path");
const app = express();
require('./api/data/db.js');

const routes = require('./api/routes');
app.set("port", process.env.PORT);
app.use ("/api", function(req, res, next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");

    res.header("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept")

    next()
    })
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));



app.use("/api", routes);
const server = app.listen(app.get("port"), function(){
    console.log("listening on port", server.address().port);
})

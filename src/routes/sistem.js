// the sistem module is going to handle with all the routes of the api
var express = require('express');
var router = express.Router();

var usersRouter = require("./user.js");

router.use("/users",usersRouter);

router.get("/",(req,res)=>{
    return res.json({message:"Template API REST + MongoDB"});
});

module.exports = router;
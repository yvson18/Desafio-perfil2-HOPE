// the sistem module is going to handle with all the routes of the api
var express = require('express');
var router = express.Router();

var usersRouter = require("./user.js");
var cardsRouter = require("./cards.js");
var reactionsRouter = require("./reaction.js");

router.use("/users",usersRouter);
router.use("/cards",cardsRouter);
router.use("/reactions",reactionsRouter);

router.get("/",(req,res)=>{
    return res.json({message:"Template API REST + MongoDB"});
});

module.exports = router;
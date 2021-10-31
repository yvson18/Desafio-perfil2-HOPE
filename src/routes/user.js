const express = require("express");
const router = express.Router();
const UserQuerier = require("../database/queries/userQuery");

router.get("/users",(req,res)=>{
    UserQuerier.readUser().then((results)=>{
        res.status(200).json({User: results});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.get("/user/:id",(req,res)=>{
    UserQuerier.readUserById(req.params.id).then((results)=>{
        res.status(200).json({User: results});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.post("/register",(req,res)=>{
    UserQuerier.createUser(req.body).then((result)=>{
        res.status(201).json({User: result});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

module.exports = router;
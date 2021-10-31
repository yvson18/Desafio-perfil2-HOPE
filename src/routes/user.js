const express = require("express");
const router = express.Router();
const UserQuerier = require("../database/queries/userQuery");

router.get("/reads",(req,res)=>{
    UserQuerier.readUser().then((results)=>{
       res.status(201).json({User: results});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.get("/read/:id",(req,res)=>{
    UserQuerier.readUserById(req.params.id).then((results)=>{
        if(results == null){
            res.status(417).json({erro: "User not found!"});
        }else{
            res.status(201).json({results});
        }
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.post("/create",(req,res)=>{
    UserQuerier.createUser(req.body).then((result)=>{
        if(result == -1){
            res.status(417).json({erro: "User already exists"});
        }
        // não retorna a senha encriptada
        var result_copia = JSON.parse(JSON.stringify(result));
        delete result_copia.password;
        res.status(201).json({User: result_copia});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.put("/update/:id",(req,res)=>{
    UserQuerier.updateUserById(req.params.id,req.body).then((results)=>{
        if(results == null){
            res.status(417).json({erro: "User not found!"});
        }else{
            res.status(201).json({results});
        }
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.delete("/delete/:id",(req,res)=>{
    UserQuerier.deleteUserById(req.params.id).then((results)=>{
        if(results == null){
            res.status(417).json({erro: "User not found!"});
        }else{
            res.status(201).json({results});
        }
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const ReactionQuerier = require("../database/queries/reactionsQuery");

router.post("/create", (req,res)=>{
    ReactionQuerier.createReaction(req.body).then((result)=>{
        res.status(201).json({result});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });

});

router.get("/reads", (req,res)=>{
    ReactionQuerier.readReactions().then((result)=>{
        res.status(201).json({result});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.get("/read/:id", (req,res)=>{
    ReactionQuerier.readReactionById(req.params.id).then((result)=>{
        res.status(201).json({result});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.delete("/delete/:id", (req,res)=>{
    ReactionQuerier.deleteReactionById(req.params.id).then((result)=>{
        if(result == null){
            res.status(422).json({erro: "Reaction not found!"});
        }else{
            res.status(201).json({result});
        }
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.put("/update/:id", (req,res)=>{
    ReactionQuerier.updateReactionById(req.params.id,req.body).then((result)=>{
        res.status(201).json({result});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});


module.exports = router;
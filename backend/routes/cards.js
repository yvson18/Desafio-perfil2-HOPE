const express = require("express");
const router = express.Router();
const CardsQuerier = require("../database/queries/cardsQuery");

router.get("/reads",(req,res)=>{
    CardsQuerier.readCards().then((results)=>{
       res.status(201).json({Cards: results});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.get("/read/:id_card",(req,res)=>{
    CardsQuerier.readCardById(req.params.id_card).then((results)=>{
       res.status(201).json({Cards: results});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.delete("/delete/:id",(req,res)=>{
    CardsQuerier.deleteCardById(req.params.id).then((results)=>{
        if(results == null){
            res.status(422).json({erro: "Card not found!"});
        }else{
            res.status(201).json({results});
        }
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.put("/update/:id",(req,res)=>{
    CardsQuerier.updateCardById(req.params.id,req.body).then((results)=>{
        if(results == null){
            res.status(422).json({erro: "Card not found!"});
        }else{
            res.status(201).json({results});
        }
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

//------------------- DICAS, FATOS, MOTIVACIONAL, ARTIGO, HISTORIA DE SUCESSO, VIDEOS ----------------
router.post("/create_esp/:id_user",(req,res)=>{
    CardsQuerier.createEspCard(req.params.id_user,req.body).then((result)=>{
        //console.log(req.params.id_user)
        if(result == -1){
            res.status(422).json({erro: "Usuario nao especialista!"});
            return;
        }
        res.status(201).json({result});
        return;
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error});
        return;
    });
});
//----------------------------- DÚVIDAS -----------------------------------------
router.post("/create_geral/:id_user",(req,res)=>{
    CardsQuerier.createGeralCard(req.params.id_user,req.body).then((result)=>{
        res.status(201).json({result});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

//Thumbsup count route

router.put("/thumbsUpInc/:id_card", (req,res)=>{
    CardsQuerier.thumbsUpInc(req.params.id_card).then((result)=>{
        res.status(201).json({operation: "Success Thumbsup increment!"});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

router.put("/thumbsUpDec/:id_card", (req,res)=>{
    CardsQuerier.thumbsUpDec(req.params.id_card).then((result)=>{
        res.status(201).json({operation: "Success Thumbsup decrement!"});
    })
    .catch((error) => {
        res.status(417).json({title: "error", status: error.errno,message: error})
    });
});

module.exports = router;
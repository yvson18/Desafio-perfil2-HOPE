const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema({
    titulo:{
        type: String,
    },
    subtitulo:{
        type: String
    },
    descricao:{
        type: String
    },
    conteudo:{
        type: String
    },
    imgs:{
        type: String
    },
    videos:{
        type: String
    },
    link_ext:{
        type: String
    },
    tipo:{
        type: Number,
        required: true
    },
    thumbsup:{
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reactions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reactions"
    }],
    createAt:{
        type: Date,
        default: Date.now
    }

}, {versionKey: false});

const Cards = mongoose.model("Cards", CardsSchema);

module.exports = Cards; 
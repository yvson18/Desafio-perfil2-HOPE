const mongoose = require("mongoose");

const ReactionsSchema = new mongoose.Schema({
    conteudo:{
        type: String,
        required: true
    },
    thumbsup:{
        type: Number,
        required: true,
        default: 0
    },
    cards: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cards",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }

}, {versionKey: false});

const Reactions = mongoose.model("Reactions", ReactionsSchema);

module.exports = Reactions; 
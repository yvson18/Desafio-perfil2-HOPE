const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    sobrenome:{
        type: String,
        required: true
    },
    idade:{
        type: Number,
    },
    cpf:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    descricao: {
        type: String,
    },
    perfil:{
        type: Number,
        required: true
    },
    dias_sobrio:{
        type: Number
    },
    dependencia:{
        type: Number
    },
    relacao_familia:{
        type: Number
    },
    createAt:{
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

UserSchema.pre("save",async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User; 
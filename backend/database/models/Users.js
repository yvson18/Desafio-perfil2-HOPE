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
        unique: true,
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
    ocupacao: {
        type: String
    },
    descricao: {
        type: String
    },
    perfil:{
        type: Number,
        required: true
    },
    img:{
        type: String
    },
    link_docs:{
        type: String
    },
    perm_espe:{
        type: Boolean,
        default: false
    },
    pub_men:{
        type: Boolean,
        default: false
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
    online:{
        type: Boolean,
        default: false
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
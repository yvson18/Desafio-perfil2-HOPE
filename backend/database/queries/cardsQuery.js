const Cards = require("../models/Cards");
const User = require("./userQuery");

exports.createEspCard = async (id_user, input) =>{
    const user = await User.readUserById(id_user);
    if(user.perfil === 4){
        var postagem = JSON.parse(JSON.stringify(input));
        postagem.user = id_user;
        return await Cards.create(postagem);
    }else{
        return -1;
    }
}

exports.createGeralCard = async (id_user, input) =>{
    var postagem = JSON.parse(JSON.stringify(input));
    postagem.user = id_user;
    return await Cards.create(postagem);
}

exports.readCards = async () =>{
    return await Cards.find({}).populate();
}

exports.readCardById = async (id) =>{
    return await Cards.findById(id);
}

exports.deleteCardById = async (id) =>{
    return await Cards.findByIdAndDelete(id);
}

exports.updateCardById = async (id,input) =>{
    return await Cards.findByIdAndUpdate(id,input,{new: true});
}

exports.thumbsUpInc = async (id) =>{
    return await Cards.findOneAndUpdate({_id :id}, {$inc : {'thumbsup' : 1}})
}

exports.thumbsUpDec = async (id) =>{
    return await Cards.findOneAndUpdate({_id :id}, {$inc : {'thumbsup' : -1}},{new: true});
}
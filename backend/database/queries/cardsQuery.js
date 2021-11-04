const Cards = require("../models/Cards");
const User_infos = require("../models/Users");
const User = require("./userQuery");
const reaction_infos = require("../models/Reactions");

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

exports.getCardsAndReactions = async(id) =>{
    const Card = await Cards.findById(id);
    var usuarios = [];
    var comentarios = [];
    // busca id dos comentarios e conteudo reaction
    for(let index = 0; index < Card.reactions.length; index++){
        usuarios.push((await reaction_infos.findById(Card.reactions[index])).user);
        comentarios.push((await reaction_infos.findById(Card.reactions[index])).conteudo);
    }
    
    //buscar usuarios comentaristas
    var usuarios_comentaristas = [];

    for(let index = 0; index < usuarios.length; index++){
        let usuario_encontrado = await User_infos.findById(usuarios[index]);
        let usuarios_info_relevante = {
            nome: usuario_encontrado.nome,
            sobrenome: usuario_encontrado.sobrenome,
            comentario: comentarios[index], 
            user_id: usuario_encontrado._id
        }
        usuarios_comentaristas.push(usuarios_info_relevante);
    }

    var Card_com_comentaristas = JSON.parse(JSON.stringify(Card));

    Card_com_comentaristas.user_commenters = usuarios_comentaristas;

    return Card_com_comentaristas 

}
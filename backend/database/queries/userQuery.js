const User = require("../models/Users");
//----------------- CRUD BÁSICO ----------------------
exports.readUser = async () =>{
    return await User.find({});
}

exports.readUserById = async (id) =>{
    return await User.findById(id);
}

exports.createUser = async (input) =>{
    var result_copia = JSON.parse(JSON.stringify(input));
    result_copia["idade"] = Number(result_copia["idade"]);
    result_copia["perfil"] = Number(result_copia["perfil"]);
    if(await User.findOne({email: input.email})){
        return -1;
    }else{
        
        console.log("entrei");
        console.log(result_copia);
        return await User.create(result_copia);
    }
}

exports.updateUserById = async (id,input) =>{
    return await User.findByIdAndUpdate(id,input,{new: true});
}

exports.deleteUserById = async (id) =>{
    return await User.findByIdAndDelete(id);
}

//----------------------------------------------------

exports.darPerEspByIdPerfil = async (id) => {
   return await User.where({_id: id, perfil: 4}).updateOne({perm_espe: true});
}

exports.sobrioCheckinById = async (id) =>{
    return await User.findOneAndUpdate({_id :id, perfil: 1}, {$inc : {'dias_sobrio' : 1}})
}

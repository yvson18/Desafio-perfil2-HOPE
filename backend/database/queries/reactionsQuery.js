const Reactions = require("../models/Reactions");
const Cards = require("../models/Cards");

exports.createReaction = async (input)=>{
    var reaction = await Reactions.create(input);
    await Cards.findByIdAndUpdate({_id: input.cards},{$push: {reactions: reaction._id}},{new: true});
    return reaction;
}
exports.readReactions = async ()=>{
    return await Reactions.find({});
}

exports.readReactionById = async (id)=>{
    return await Reactions.findById(id);
}

exports.updateReactionById = async (id,input)=>{
    return await Reactions.findByIdAndUpdate(id,input,{new: true});
}

exports.deleteReactionById = async (id) =>{
    return await Reactions.findByIdAndDelete(id)
}
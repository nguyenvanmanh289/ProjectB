import Audio from "../model/audio.model" 
import FileUpload from "@/utils/handlers/audioUpload";
import { APP_URL_API } from "@/config";
import { Category } from "../model/category.model";
import { ObjectId } from "mongodb";
import { User } from "../model/user.model";
import { Admin } from "../model/admin.model";

export const filterAudio = async ({ q , page , limit , field , sort})=>{
    q = q ? { "$regex" : q , "$options" : "i"} : null;
    
    const filter = {
        ...(q && {$or : [ {name : q} , {description : q} ]})
    }
    const jump = (page-1)*limit; 

    const audios = await Audio.find(filter)
        .skip(jump)
        .limit(limit)
        .sort({[field] : sort});

    return audios.map((audio)=>{
        audio.sourceUrl = APP_URL_API + audio.sourceUrl
        audio.thumnailUrl = APP_URL_API + audio.thumnailUrl
        return audio;
    })
}

export const createAudio = async ({name , description,authorId ,thumnail , sound ,categories}) =>{
    try {
        const audio = new Audio({_id:new ObjectId()});
        audio.name = name;
        audio.description = description;
        audio.categories = categories;
        Promise.all(categories.map(async (category_id) =>{
            await Category.findByIdAndUpdate(
                {_id : new ObjectId(category_id)},
                { $push : {sounds : audio._id.toString()}}
            )
        }))
        
        await User.updateOne(
            {_id : authorId},
            {$push : { uploadedAudio : audio._id.toString()}}
        )
        await Admin.updateOne(
            {_id : authorId},
            {$push : { uploadedAudio : audio._id.toString()}}
        )

        if (thumnail instanceof FileUpload && sound instanceof FileUpload) {
            audio.thumnailUrl = thumnail.save();
            audio.sourceUrl = sound.save();
        }
        return await audio.save();
    }
    catch (err) {
        return new Error("failed to save audio: " + err.message);
    }
}

export const detailAudio = async ({id})=>{
    const audio =  await Audio.findById(id);
    audio.sourceUrl = APP_URL_API + audio.sourceUrl
    audio.thumnailUrl = APP_URL_API + audio.thumnailUrl

    return audio;
}

export const updateAudio = async ({id,name,description,thumnail,sound,categories})=>{

    try {
    const audio = await Audio.findById(id);
    name? audio.name = name : "";
    description? audio.description = description : "";

    Promise.all(audio.categories.map(async (category_id) => {
        await Category.findByIdAndUpdate(
            {_id: new ObjectId(category_id)},
            { $pull: {sounds: id}},
        );
    }));

    categories? audio.categories = categories : "";
    Promise.all(categories.map(async (category_id) => {
        await Category.findByIdAndUpdate(
            {_id: new ObjectId(category_id)},
            { $push: {sounds: id}}
        );
    }));

    if (thumnail instanceof FileUpload) {
        FileUpload.remove(audio.thumnailUrl);
        audio.thumnailUrl = thumnail.save();
    }

    if (sound instanceof FileUpload) {
        FileUpload.remove(audio.sourceUrl);
        audio.sourceUrl = sound.save();
    }

    return await audio.save();
} catch (err) {
    throw new Error("Failed to update audio: " + err.message);
}
}

export const removeAudio = async ({body,curentAdmin})=>{
    const id = body.id;
    const audio = await Audio.findById(id);
    Promise.all(audio.categories.map(async (category_id) => {
        await Category.findByIdAndUpdate(
            {_id: new ObjectId(category_id)},
            { $pull: {sounds: id}},
        );
    }));
    
    await Admin.updateOne(
        {email:curentAdmin.email},
        {$pull: { uploadedAudio : id}}
    )
    FileUpload.remove(audio.sourceUrl);
    FileUpload.remove(audio.thumnailUrl);
    return await Audio.findByIdAndDelete(id);
}
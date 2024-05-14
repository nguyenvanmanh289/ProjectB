import { User } from "../model/user.model";
import { generatePassword } from "@/utils/handlers/hashPassword";
import uniqid from 'uniqid';
import FileUpload from "@/utils/handlers/audioUpload";
import { APP_URL_API } from "@/config";
import Audio from "../model/audio.model";
import { ObjectId } from "mongodb";

export const createUser = async (req) => {
    try {
        console.dir(req.body.avatar)
        let avatarUrl = "";
        if (req.body.avatar instanceof FileUpload) {
            avatarUrl =  req.body.avatar.save();
        }
        const payload = req.body;

        const user = new User({
            name: payload.name || uniqid.time("user-"),
            password: generatePassword(payload.password),
            email: payload.email,
            avatarUrl: avatarUrl,
            bio: payload.bio || "",
        });

        return await user.save();
    }
    catch (err) {
        throw new Error(err);
    }
}

export const detail = async ({email}) => {
    const user = await User.findOne({email:email});
    const linkavatar = APP_URL_API + user.avatarUrl;
    user.avatarUrl = linkavatar;
    return user;
}

export const updateUser = async (req) => { 
    const user = await User.findOne({email:req.curentUser.email});

    if(req.body.avatar instanceof FileUpload){
        FileUpload.remove(user.avatarUrl);
        user.avatarUrl = req.body.avatar.save();
    }
    const payload = req.body;

    payload.name ? user.name = payload.name : "";
    payload.email ? user.email = payload.email : "";
    payload.bio ? user.bio = payload.bio : "";

    return await user.save();
}

export const removeUser = async (payload)=>{
    payload = {
        email: payload.email
    }
    const user = await User.findOne(payload);
    
    await Audio.updateMany(
        {_id : { $in : user.uploadedAudio }},
        {authorId : ""}
    )

    FileUpload.remove(user.avatarUrl);
    return await User.deleteOne(payload);
}

//login/out

export const loginUser = async (payload)=>{
    const user = await User.findOne({email : payload.email});

    const dataUpdate = [];
    Promise.all(user.uploadedAudio.map( async (audio_id)=>{
        const audio = await Audio.findById(audio_id);
        if(audio) dataUpdate.push(audio_id);
    }))
    user.uploadedAudio = dataUpdate;
    return user.save();
}

import { User } from "../model/user.model";
import { generatePassword } from "@/utils/handlers/hashPassword";
import uniqid from 'uniqid';
import FileUpload from "@/utils/handlers/audioUpload";
import { APP_URL_API } from "@/config";

export const createUser = async (req) => {
    try {
        let avatarUrl = "";
        if (req.files instanceof FileUpload) {
            avatarUrl =  req.files.save();
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

export const detail = async (id) => {
    const user = await User.findById(id);
    const linkavatar = APP_URL_API + user.avatarUrl;
    user.avatarUrl = linkavatar;
    return user;
}

export const updateUser = async (req) => { 
    const user = await User.findById(req.body.id);

    if(req.files instanceof FileUpload){
        FileUpload.remove(user.avatarUrl);
        user.avatarUrl = req.files.save();
    }
    const payload = req.body;

    payload.name ? user.name = payload.name : "";
    payload.email ? user.email = payload.email : "";
    payload.bio ? user.bio = payload.bio : "";

    return await user.save();
}

export const removeUser = async (id)=>{
    const user = await User.findById(id);
    FileUpload.remove(user.avatarUrl);
    return await User.deleteOne({_id: id})
}

//login/out

export const loginUser = async (payload)=>{
    const user = await User.findOne({email : payload.email});
    return user;
}

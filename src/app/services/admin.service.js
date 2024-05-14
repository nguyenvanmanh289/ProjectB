import {Admin} from "../model/admin.model"
import { generatePassword  } from "@/utils/handlers/hashPassword";

export const create = async (payload)=>{
   
    const admmin = new Admin({
        adminname : payload.adminname,
        email : payload.email,
        password :  generatePassword(payload.password)
    })

    return await admmin.save();
}
    
export const login = async (payload)=>{
    const admin = await Admin.findOne({email : payload.email});
    return admin;
}

export const remove = async (payload)=>{
    const admin = await Admin.findOne(payload);
    await Audio.updateMany(
        {_id : { $in : admin.uploadedAudio }},
        {authorId : ""}
    )
    return await Admin.deleteOne(payload);
}
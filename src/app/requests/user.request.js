import { AsyncValidate } from "@/utils/handlers/AsyncValidate";
import { User } from "../model/user.model";
import Joi from "joi";
import { Admin } from "../model/admin.model";

export const userCreate = Joi.object({
    name : Joi.string().min(8).max(50).label("tên người dùng"),
    email : Joi.string().email().required().custom((value,helpers)=>{
        new AsyncValidate(value,async function(){
            const admin = await Admin.findOne({email: value});
            const user = await User.findOne({email : value});
            if(!admin){
                if(!user){
                    return value;
                }
                else{
                    return helpers.error("any.exists");
                }
            }else{
                return helpers.error("any.exists");
            }

        })
    }).label("email"),    
    password : Joi.string().min(8).max(50).required().label("mật khẩu"),
    bio : Joi.string().max(500).label("mô tả")
});

export const userLogin = Joi.object({
    email:Joi.string().email().required().custom((value,helpers) => 
        new AsyncValidate(value,async function(){
            const user = await User.findOne({email : value});
            return  user ? value : helpers.error("any.notFound");
        })
    ),
    password:Joi.string().min(6).max(50).required()
})
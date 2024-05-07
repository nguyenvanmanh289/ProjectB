import { responseSuccess,responseError } from "@/utils/helpers/response.helpers"
import { createUser,detail as details ,updateUser } from "../services/user.service";


export const create = async (req,res,next)=>{
    try {
        const user = await createUser(req)
        console.log(user,"=======")
        await responseSuccess(res, null);
    } catch (error) {
        next(error);
    }
}


export const detail = async (req,res,next)=>{
    try {
        const user = await details(req.query.id);
        await responseSuccess(res, user);
    } catch (error) {
        next(error);
    }
}

export const update = async (req,res,next)=>{
    try {
        const user = await updateUser(req);
        await responseSuccess(res, user);
    } catch (error) {
        next(error);
    }
}

export const remove = async (req,res,next)=>{
    try {
        
        await responseSuccess(res, null);
    } catch (error) {
        next(error);
    }
}


export const login = async (req,res,next)=>{
    try {
        
        await responseSuccess(res, null);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req,res,next)=>{
    try {
        
        await responseSuccess(res,null);
    } catch (error) {
        next(error);
    }
}
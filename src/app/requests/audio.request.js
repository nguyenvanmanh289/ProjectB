import Joi from "joi";
import Audio from "../model/audio.model";
import { tryValidateOrDefault } from "@/utils/helpers/validate.helper";
import { AsyncValidate } from "@/utils/handlers/AsyncValidate";
import { Admin } from "../model/admin.model";
import { User } from "../model/user.model";

export const filterAudio = Joi.object({
    q : tryValidateOrDefault(Joi.string().trim(),""),
    page : tryValidateOrDefault(Joi.number().integer().min(1),1),
    limit : tryValidateOrDefault(Joi.number().integer().min(5),20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "description"), "created_at"),
    sort : tryValidateOrDefault(Joi.number().integer().valid(1,-1),1)
}).unknown(true)

export const createAudio = Joi.object({
    name : Joi.string().min(6).max(70).required().label("tiêu đề âm thanh"),
    description : Joi.string().min(10).max(300).required().label("mô tả âm thanh"),
    authorId : Joi.string().min(5).max(50).required().custom((value,helpers)=>
        new AsyncValidate(value,async function(){
            const admin = await Admin.findById(value);
            const user = await User.findById(value);
            return (admin || user) ?  value : helpers.error("any.notFound")
        })
    ).label("id người đăng tải âm thanh"),
    sound : Joi.object().required().label("file âm thanh"),
    thumnail : Joi.object().required().label("thumnail của âm thanh"),
    categories : Joi.array().required().label("danh sách danh mục")
})

export const updateAudio = Joi.object({
    id:Joi.string().required().label("id âm thanh").custom((value, helpers) =>
        new AsyncValidate(value, async function () {
            const audio = await Audio.findById(value);
            return audio ? value : helpers.error("any.notFound");
        })
    ),
    name : Joi.string().min(6).max(70).label("tiêu đề âm thanh"),
    description : Joi.string().min(10).max(300).label("mô tả âm thanh"),
    sound : Joi.object().label("file âm thanh"),
    thumnail : Joi.object().label("thumnail của âm thanh"),
    categories : Joi.array().label("danh sách danh mục")
})

export const detailAudio = Joi.object({
    id: Joi.string().required().label("id âm thanh").custom((value, helpers) =>
        new AsyncValidate(value, async function () {
            const audio = await Audio.findById(value);
            return audio ? value : helpers.error("any.notFound");
        })
    )
})


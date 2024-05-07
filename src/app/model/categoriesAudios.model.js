import { createModel } from "./base";
import { Schema } from "mongoose";

const schema = new Schema({
    categoryId : String,
    audioId : String,
})

export const CategoiesAudios = createModel("CategoiesAudios", schema);  
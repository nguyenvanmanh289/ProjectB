import { createModel } from "./base";
import { Schema } from "mongoose";

const schema = new Schema({
    name: String,
    description : String,
    sounds : Array
})

export const Category = createModel("Category", schema);  
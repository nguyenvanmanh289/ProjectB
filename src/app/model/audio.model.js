import { createModel } from "./base";
import { Schema } from "mongoose";
const schema = new Schema({
    name : String,
    description : String,
    authorId : String,
    thumnailUrl : String,
    sourceUrl : String,
    categories : Array
})

const Audio = createModel("Audio", schema);  
export default Audio;
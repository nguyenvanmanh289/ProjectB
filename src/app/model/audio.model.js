import { createModel } from "./base";
import { Schema } from "mongoose";
const schema = new Schema({
    name : String,
    description : String,
    thumnails : String,
    sourceUrl : String,
})

const Audio = createModel("Audio", schema);  
export default Audio;
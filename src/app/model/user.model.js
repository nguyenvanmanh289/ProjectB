import { createModel } from "./base";
import { Schema } from "mongoose";

const schema = new Schema({
    name : String,
    password : String,
    email : String,
    avatarUrl : String,
    bio : String,
    likedAudio : Array,
    uploadedAudioUrl : Array,
    downloadedAudioUrl : Array
})

export const User = createModel("User", schema);
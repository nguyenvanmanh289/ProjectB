import { createModel } from "./base";

const schema = {
    adminname : String,
    password : String,
    email : String,
    uploadedAudio : Array,
}

export const Admin = createModel("Admin", schema);  
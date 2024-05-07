import { STORAGE_DIR } from "@/config";
import fs from 'fs';
import path from "path";
import uniqid from "uniqid";

export default class FileUpload {
    constructor(orignalName, buffer) {
       this.orignalName = uniqid('data') +path.extname(orignalName),
       this.buffer = buffer
    }

    save =()=>{
        fs.writeFileSync(path.join(STORAGE_DIR,this.orignalName), this.buffer )
        return path.join("static",this.orignalName);
    }

    static remove = (path)=>{
        const newpath = path.replace(/static/,STORAGE_DIR);
        if(fs.existsSync(newpath)){
            fs.unlinkSync(newpath);
        }
    }
}

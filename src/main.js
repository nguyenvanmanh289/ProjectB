import { connectToDatabase } from "./config/mongodb";
import {log as command } from "./app/command/index";
import { ESLINT_TEST } from "./config/constant";
import { createApp } from "./index";
import { spawn } from 'child_process';
import process from "process";
import { HOST , PORT } from "./config/constant";

//create server
const app = createApp();
const server = app.listen(PORT,HOST,()=>{
    console.log(`server is running on ${HOST}:${PORT}`);
});

//command
command();

//connect to database
connectToDatabase();

//command
const commands = "npm";
const code = ["run","lint","--silent"];
const option = {
    shell : true
};
//ESLINT TESTING
if(ESLINT_TEST === "true"){
    const eslint_test = spawn(commands,code,option);
    eslint_test.on('close', (code) => {
        if(code !== 0){
            console.log("server error shutting down with code " + code);
            server.close();
            process.exit(code);
        }
    }); 
}



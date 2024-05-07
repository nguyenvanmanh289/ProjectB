import express from 'express';
import { STORAGE_DIR } from './config/constant';
import route from './routers/index';
import { errorHandler } from './utils/handlers/error.handle';
import bodyParser from 'body-parser';

export const createApp = () =>{
    const app = express();

    app.use('/static',express.static(STORAGE_DIR))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.get('/', (req, res) =>{
        res.write("<h1>hello express</h1>");
        res.end();
    });
    route(app);
    app.use(errorHandler);
    return app;
};

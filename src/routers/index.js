import admin from './admin';
import audio from './audio';
import category from './category';
import user from './user';

const route = (app) => {
    app.use("/admin",admin);
    app.use("/sound",audio);
    app.use("/categories",category);
    app.use("/user",user);
};

export default route; 
import admin from './admin';
import audio from './audio';
import category from './category';
import user from './user';

const route = (app) => {
    app.use("/admin",admin);
    // app.use("/audio",audio);
    // app.use("/category",category);
    app.use("/user",user);
};

export default route; 
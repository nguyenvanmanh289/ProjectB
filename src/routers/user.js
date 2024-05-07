import { Router } from "express";
import { create,detail,update,remove,login,logout } from "@/app/controller/user.controller";
import { uploadFile } from "@/config/multer";
import { validate } from "@/app/middleware/validate";
import { userCreate } from "@/app/requests/user.request";

const router = Router();

router.get(
    '/infor',
     detail
);


router.post(
    '/register',
    uploadFile,
    validate(userCreate),
    create
)

router.post(
    '/login',
    login
)

router.put(
    '/update',
    uploadFile,
    update
)

router.post(
    '/delete',
    remove
)

router.post(
    '/logout',
    logout
)

export default router;
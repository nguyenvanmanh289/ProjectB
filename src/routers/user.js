import { Router } from "express";
import { create,detail,update,remove,login,logout } from "@/app/controller/user.controller";
import { uploadFile } from "@/config/multer";
import { validate } from "@/app/middleware/validate";
import { userCreate,userUpdate,userRemove,userLogin } from "@/app/requests/user.request";
import { verifyToken } from "@/app/middleware/auth.token.user";

const router = Router();

router.get(
    '/infor',
    verifyToken,
    validate(userRemove),
     detail
);


router.post(
    '/register',
    uploadFile,
    validate(userCreate),
    create
)

router.put(
    '/update',
    verifyToken,
    uploadFile,
    validate(userUpdate),
    update
)

router.delete(
    '/delete',
    verifyToken,
    validate(userRemove),
    remove
)

router.post(
    '/login',
    validate(userLogin),
    login
)

router.post(
    '/logout',
    verifyToken,
    logout
)

export default router;
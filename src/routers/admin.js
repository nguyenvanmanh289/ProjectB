import { create, login, remove ,logout} from "../app/controller/admin.controller";
import { Router } from "express";
import { validate } from "@/app/middleware/validate";
import { adminCreate, adminLogin } from "@/app/requests/admin.request";
import { verifyToken } from "@/app/middleware/auth.token";

const router = Router();

router.post(
    '/login',
    validate(adminLogin),
    login
);

router.post(
    '/create',
    validate(adminCreate),
    create,
);

router.delete(
    '/delete',
    verifyToken,
     remove
);

router.post(
    '/logout',
    verifyToken,
    logout
);

export default router;
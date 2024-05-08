import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { responseError } from '@/utils/helpers/response.helpers';
import cache from '@/storage/cache/cache';

export const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = req.headers['authorization'].replace(/Bearer/, '').trim();
        if (!cache.getCache(token)) {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    responseError(res, err, 400, "từ chối truy cập");
                }
                else {
                    req.curentUser = decoded;
                    next();
                }
            })
        }
        else {
            responseError(res, null, 400, "token đã hết hạn sử dụng");
        }

    }
    else responseError(res, null, 400, "token không được cung cấp");

}
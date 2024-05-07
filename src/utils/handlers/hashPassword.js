import bcrypt from 'bcrypt';
import { SALT_ROUND } from '@/config/constant';

const sat = SALT_ROUND ? +SALT_ROUND : 10;
export const generatePassword = (rawPassword) =>{
    const salt = bcrypt.genSaltSync(sat);
    return bcrypt.hashSync(rawPassword, salt);
    
}

export const comparePassword = (rawPassword, hash) =>{
    return bcrypt.compareSync(rawPassword, hash)
}
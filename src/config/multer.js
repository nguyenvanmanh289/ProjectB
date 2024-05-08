import multer from 'multer'
import { fileFilter } from '@/utils/handlers/fileFilter.multer';
import FileUpload from '@/utils/handlers/audioUpload';

const storage = multer.memoryStorage()
const upload = multer({
     storage: storage, 
});

export const uploadFile = (req,res,next) => {
    upload.any()(req,res ,(err)=>{
        if(err){
            return next(err);
        }

        if(req.files.length > 0){
            const file = new FileUpload(
                req.files[0].originalname,
                req.files[0].buffer
            );
            req.files = file;
        }
        next();
    });
    
}

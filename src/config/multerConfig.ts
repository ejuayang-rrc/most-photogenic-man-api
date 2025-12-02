import multer, { 
    FileFilterCallback, 
    Multer, 
    StorageEngine 
} from "multer";
import { Request } from "express";

// Handles file storing
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
    },
});

/**
 * Filters uploaded files to only allow jpeg and png formats
 * @param req The Express `Request` object
 * @param file Object containing information about the processed file
 * @param callback Function to control which files should be uploaded and which should be skipped
 */
const fileFilter = (
    req: Request, 
    file: Express.Multer.File, 
    callback: FileFilterCallback
): void => {
    const allowedTypes = ["image/jpeg", "image/png"];
    
    if (!allowedTypes.includes(file.mimetype)) {
        callback(new Error("Only images are allowed"));
    }

    callback(null, true);
};

const upload: Multer = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, 
    fileFilter,
});

export default upload;

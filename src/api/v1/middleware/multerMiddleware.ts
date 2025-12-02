import upload from "../../../config/multerConfig";

export const uploadImage = upload.single("file");

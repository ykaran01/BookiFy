import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    const uploadPath = path.join(process.cwd(), "public", "temp");

    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    

    const fileExtension = path.extname(file.originalname);
    
    
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

export const upload = multer({ storage: storage });
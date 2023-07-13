// import express from 'express';
// const img = express.Router();
// import multer from 'multer';

// import { impImage } from '../controller/import-controller.js';

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploadedImages/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname + '-' + Date.now())
//     }
// })

// const upload = multer({ storage: storage})

// img.post('/importImages/data', upload.single('myFile'), impImage);

// export default img;
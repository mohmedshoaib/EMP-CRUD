import express from 'express'
const user = express.Router();
import multer from 'multer'
// import path from 'path'
// import bodyParser from 'body-parser'
import { impData } from '../controller/import-controller.js';

// user.use(bodyParser.urlencoded({extended: true}))
// user.use(express.static(path.resolve(__dirname, '.uploads')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  })

const upload = multer({ storage: storage })

// const upload = multer({dest: 'uploads/'})

user.post('/importUser/data', upload.single('myFile'), impData);

export default user;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import { connection } from './database/db.js'
import { router } from './routes/route.js'
// import { uploadRoute } from './routes/uploadRoute.js'
import {dirname} from 'path'
import * as url from "url"
import user from './routes/uploadRoute.js'
import { project } from './routes/projectRoutes.js'
import { work } from './routes/workRoutes.js'
import errorMiddleware from './middlewares/errormiddleware.js';
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' })
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const filePath = __dirname + '/exceldata/'
export const filePath1 = __dirname + '/uploads/'
export const filePath2 = __dirname + '/uploadedImages/'
export const filePath3 = __dirname + '/public/'
export const file =  '.uploads/'
console.log(__dirname)

const app = express();

const coreOptions = {
    origin: true,
    credentials: true,
}

dotenv.config();
app.use(cors(coreOptions))
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static('public'));
app.use('/', router);
app.use('/', user);
app.use('/', project);
app.use('/', work);
app.use(errorMiddleware)
app.use(express.json())
const PORT = 5000; // mongodb default value 


// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

connection()
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
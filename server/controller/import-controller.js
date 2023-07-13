// import fs from 'fs';
// import XLSX from 'xlsx';
// import userModel from '../schema/user-schema.js';
import { filePath1, filePath2 } from '../index.js';
import { importToDb } from '../utils/addImportToDb.js';
import userModel from "../schema/user-schema.js";

export const impData = async (req, res) => {
    try {
        // console.log(req.file)
        const file1 = filePath1 + req.file.filename
        importToDb(file1, userModel)
        res.status(200).json({ message: 'Data uploaded successfully.' });
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message });
    }
}


// export const impImage = async (req, res) => {
//     try {
//         const file2 = filePath2 + req.file.filename
//         importImageToDb(file2, userModel)
//         res.status(200).json({message: 'Image Data uploaded successfully. '});
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({message: error.message });
//     }
// }



// export const impData = async (req, res) => {
//     try {
//         const file = req.file;
//         const filePath = `${filePath}/${file.filename}`;

//         // Read the Excel File
//         const workbook = XLSX.readFile(filePath);
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//         // Prepare data to be added to the existing schema
//         const dataToInsert = excelData.map((row) => ({
//             name: row[0],
//             address: row[1],
//             email: row[2],
//             phone: row[3],
//             status: row[4],
//             reg_date: row[5],
//         }));

//         await userModel.insertMany(dataToInsert);
//         res.status(200).json({ message: 'Data uploaded successfully.' });
//     } catch (error) {
//         console.log(error)
//         res.error(500).json({ message: 'Error while Uploading data.'})
//     }
// }
import userModel from "../schema/user-schema.js";
import { filePath } from "../index.js";
import XLSX from 'xlsx';
import jsonexport from "jsonexport";
import fs from 'fs'
import path from 'path'
// import JSON2CSVParser from "json2csv/JSON2CSVParser.js";

export const expData = async (request, response) => {
  try {
    const userData = await userModel.find({})
    const jsonData = userData.map((user) => ({
      id: String(user._id),
      name: user.name,
      address: user.address,
      email: user.email,
      phone: user.phone,
      status: user.status,
      reg_date: user.reg_date,
      __v: user.__v
    }))
    jsonexport(jsonData, function (err, csv) {
      if(err) {
        console.error(err)
        return response.status(500).send('Server error')
      } else {
        response.setHeader('Content-type', 'text/csv')
        response.setHeader('Content-Disposition', 'attachment: filename=data.csv')
        // const file1 = filePath + "UserData.json"
        // fs.writeFileSync(csv, data)
        console.log("Downloaded the CSV file of Employee table")
        response.send(csv)
      }
    })
  }
  catch (error) {
    response.status(400).json({message: error.message });
  }
}
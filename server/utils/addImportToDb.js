import fs from 'fs';
import path from 'path';
import csv from 'fast-csv';
import userModel from '../schema/user-schema.js';

export const importToDb = async (path, model) => {
    const dataArr = []
    const stream = fs.createReadStream(path).pipe(csv.parse({ headers: true }));
    console.log(stream)
    for await (const data of stream) { 
        
        // Check if the email or phone number already exists in the database
        try {
            const result = await model.findOne({
                $or: [{ email: data.email }, { phone: data.phone }],
            });
            if(!result) {
                dataArr.push(data);
            }
        } catch (error) {
            console.log('Error querying MongoDB:', error);
            return;
        }
    }
    // Insert the filtered data into the database
    for (const item of dataArr) {
        console.log(item);
        try {
            await model.create({
                name: item.name,
                address: item.address,
                email: item.email,
                phone: item.phone,
                status: item.status,
                reg_date: item.reg_date,
            });
        } catch (error) {
            console.log('Error inserting data to MongoDB: ', error);
        }
    }
}


// export const importImageToDb = async (path, model) => {
    
// }

// export const importToDb = (path, model) => {
//     const dataArr = []
    
//     fs.createReadStream(path)
//         .pipe(csv.parse())
//         .on('error', error => console.error(error))
//         .on('data', function(data) {
//             dataArr.push(data)
//         })
//         .on('end', function(){
//             dataArr.shift()
//             dataArr.forEach((item) => {
//                 console.log(item)
//                 model.create({
//                     name: item[0],
//                     address: item[1],
//                     email: item[2],
//                     phone: item[3],
//                     status: item[4],
//                     reg_date: item[5]
//                 })
//             })
//         });
//     // csv.parseFile(path)
//     // .on('error', error => console.error(error))
//     // .on('data', row => console.log(`${JSON.stringify(row)}`))
//     // .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
// }
import userModel from "../schema/user-schema.js";
import userSalary from "../schema/salary-schema.js";
import { filePath3 } from "../index.js";
import fs from "fs";
// import json2csv from 'json2csv';
// import mongoose from 'mongoose';
// import XLSX from 'xlsx';
// import { request } from "express";
export const addUser = async (request, response, next) => {
  const user = request.body;
  console.log(user);
  // const newUser =await new userModel(user);
  try {
    // userModel.createIndexes({"email": })
    // const user = await userModel.create({ ...request.body });
    const url = request.protocol + "://" + request.get("host");
    const user = await userModel.create({
      name: request.body.name,
      email: request.body.email,
      address: request.body.address,
      phone: request.body.phone,
      status: request.body.status,
      reg_date: request.body.reg_date,
      image: url + "/public/" + request.file.filename,
    });

    // await newUser.save()
    response.status(201).json(user);
  } catch (error) {
    console.log(error);
    next(error, { message: error.message });
    // response.status(409).json({ message: error.message });
  }
};

export const getUsers = async (request, response) => {
  try {
    const users = await userModel.find({});
    response.status(200).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUser = async (request, response) => {
  try {
    // const user = await userModel.find({_id: request.params.id})
    const user = await userModel.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// export const editUser = async (request, response) => {
//   let user = request.body;
//   console.log(user)
//   // const editUser = new userModel(user);
//   // console.log(request.)
//   try {
//     const url = request.protocol + '://' + request.get('host')
//     const imageurl = url + '/public/' + request.file.filename
//     // await userModel.updateOne({ _id: request.params.id }, editUser);
//     console.log(imageurl)
//     const editedUser = await userModel.findByIdAndUpdate(request.params.id, {
//       $set: {
//         "name": request.body.name,
//         "email": request.body.email,
//         "address": request.body.address,
//         "phone": request.body.phone,
//         "image": url + '/public/' + request.file.filename,
//       }
//     })
//     console.log(editedUser)
//     response.status(200).json(editUser);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// };

export const editUser = async (request, response, next) => {
  const { id } = request.params;
  const { name, email, address, phone } = request.body;
  if (!name || !email || !address || !phone)
    return next(new Error(400, "all fields are required"));
  if (request.file === undefined) {
    console.log("Edited Employee Without Image Update");
    // const emp_details = [ name, email, address, phone, ];
    try {
      const editedUser = await userModel.findByIdAndUpdate(request.params.id, {
        $set: {
          name: request.body.name,
          email: request.body.email,
          address: request.body.address,
          phone: request.body.phone,
        },
      });
      // console.log(editedUser)
      response.status(200).json(editUser);
    } catch (error) {
      next(error);
    }
  } else {
    const user = await userModel.findById(id);
    if (user.image) {
      const userImagePath = filePath3 + user.image.split("/")[4];
      fs.unlinkSync(userImagePath, function (err) {
        if (err) {
          throw err;
        } else {
          console.log("Successfully deleted the File");
        }
      });
    }
    // console.log(userImagePath);
    console.log("Edited Employee With Image Update");
    const url = request.protocol + "://" + request.get("host");
    const imageurl = url + "/public/" + request.file.filename;
    // const emp_details = [ name, email, address, phone, image ];
    try {
      const editedUser = await userModel.findByIdAndUpdate(request.params.id, {
        $set: {
          name: request.body.name,
          email: request.body.email,
          address: request.body.address,
          phone: request.body.phone,
          image: url + "/public/" + request.file.filename,
        },
      });
      // console.log(editedUser)
      response.status(200).json(editUser);
    } catch (error) {
      next(error);
    }
  }
};

export const deleteUser = async (request, response) => {
  const { id } = request.params;
  try {
    const user = await userModel.findById(id);
    const userImagePath = filePath3 + user.image.split("/")[4];
    fs.unlinkSync(userImagePath, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("Successfully deleted the File");
      }
    });
    await userModel.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: "Deleated User Successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const addSalary = async (request, response) => {
  try {
    const salary = await userSalary.create({ ...request.body });
    response.status(201).json(salary);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const delSalary = async (request, response) => {
  const { id } = request.params;
  try {
    await userSalary.deleteOne({ user_id: id });
    response.status(200).json({ message: "Deleated Salary Successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getSalaries = async (request, response) => {
  try {
    const user_salaries = await userSalary.find({});
    response.status(200).json(user_salaries);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getSalary = async (request, response) => {
  const { id } = request.params;
  try {
    const userSal = await userSalary.findOne({ user_id: id });
    response.status(200).json(userSal);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const editSalary = async (request, response) => {
  let sal = request.body;
  const editSalary = new userSalary(sal);
  try {
    await userSalary.updateOne({ user_id: request.params.id }, editSalary);
    response.status(200).json(editSalary);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const changeStatus = async (request, response) => {
  const { id } = request.params;
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    // Update the status value
    user.status = user.status === "0" ? "1" : "0";

    await user.save();
    response.status(200).json({ user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

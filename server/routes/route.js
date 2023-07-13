import express from "express";
import multer from "multer";
import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  addSalary,
  getSalaries,
  getSalary,
  editSalary,
  changeStatus,
  delSalary,
} from "../controller/user-controller.js";

import { expData } from "../controller/export-controller.js";
// import { impData } from "../controller/import-controller.js";

export const router = express.Router();
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/apng" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/svg" 
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error(403, "Only .png, .jpg, .jpeg format allowd!"));
    }
  },
  limits: 2000000,
});

// const upload = multer({ storage: storage, limits: 2000000 })

router.post("/add", upload.single("image"), addUser);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.put("/:id", upload.single("image"), editUser);
router.delete("/:id", deleteUser);
router.post("/:id", addSalary);
router.get("/all/salary", getSalaries);
router.get("/sal/:id", getSalary);
router.put("/sal/edit/:id", editSalary);
router.put("/all/editstatus/:id", changeStatus);
router.get("/all/export/:file", expData);
router.delete("/sal/del/:id", delSalary);
// router.get("/all/exportUser", expData);
// router.post("/all/import", impData);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.filename + '-' + Date.now())
//   }
// })

// const upload = multer({ storage: storage})

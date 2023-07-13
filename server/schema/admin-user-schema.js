import mongoose from "mongoose";

const loginUserSchema = new mongoose.Schema({
    user_name: {type:String, required: [true, "Please Enter Name"]},
    user_email: {type:String, index: { unique: true, sparse: true }},
    user_phone: String,
    user_password: String,
    user_type: String,
})

const login = mongoose.model('login', loginUserSchema)

export default login;
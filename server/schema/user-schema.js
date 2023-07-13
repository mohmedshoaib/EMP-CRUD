import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator";
const userSchema = new mongoose.Schema({
    name: {type:String, required: [true, "Please Enter Name"]},
    address: {type:String},
    email: {type:String, index: { unique: true, sparse: true }},
    phone: {type:String, unique: true},
    status: {type:String},
    reg_date: {type:String},
    image: {type:String},
})
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, 'user');
userSchema.plugin(mongooseUniqueValidator);
const user = mongoose.model('user', userSchema)

export default user;

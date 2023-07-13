import mongoose from "mongoose"

const userSalarySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    salary: Number,
    // user_id : String,
})

const userSalary = mongoose.model('userSalary', userSalarySchema);

export default userSalary;
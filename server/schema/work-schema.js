import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    emp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    workDate: String,
    workStartTime: String,
    workEndTime: String,
    workDes: String,
});

const work = mongoose.model('work', workSchema);
export default work;

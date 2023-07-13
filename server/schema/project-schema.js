import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projTitle: String,
    projDesc: String,
    timeStamp: String,
    status: String,
    start_date: String,
})

const Project = mongoose.model('project', projectSchema)
export default Project;
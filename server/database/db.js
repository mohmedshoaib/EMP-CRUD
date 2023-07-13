import mongoose from 'mongoose'
mongoose.set('strictQuery', true)
export const connection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/user', { useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true})
        console.log("connected to db")
    }
    catch(error) {
        console.log('Error while connecting with the database', error);
    }
}

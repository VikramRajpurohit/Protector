const mongoose = require('mongoose');
require('dotenv/config');

const DB = "mongodb+srv://vikram:vikram1234@cluster0.eaasq.mongodb.net/ExamPortal?retryWrites=true&w=majority"

const connectDB = async() => {
    await mongoose.connect(DB, {
        useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    console.log("MongoDB Connection done Successfully...");
}


module.exports = connectDB;
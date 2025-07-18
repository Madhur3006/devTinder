const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://firstProject:P9kFIJlv@cluster0.arsnor3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
}


module.exports = {connectDB}
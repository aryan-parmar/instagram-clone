const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;

exports.connect = () => {
    mongoose.connect(MONGO_URI+"instagram-clone", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
};
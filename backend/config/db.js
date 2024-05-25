const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE).then((data) => {
        console.log(`DB Connected with server: ${data.connection.host}`);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectDB;


const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log("DB Connected successfully") })
        .catch((err) => {
            console.log("DB Connection Issue");
            console.error(err);
            process.exit(1);
        })
}
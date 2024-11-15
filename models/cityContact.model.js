const mongoose = require("mongoose");

const cityContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("CityContact", cityContactSchema)
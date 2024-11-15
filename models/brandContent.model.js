const mongoose = require("mongoose");

const brandContentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("brandContent", brandContentSchema)
// brandContentController.js

const BrandContent = require("../models/brandContent.model"); // Import the brandContent model

// Controller to get all brand contents
exports.getAllBrandContents = async (req, res) => {
    try {
        const brandContent = await BrandContent.findOne({ name: new RegExp(`^${name}$`, 'i') });
        res.status(200).json(brandContents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching brand contents", error });
    }
};

// Controller to get a single brand content by name
exports.getBrandContentByName = async (name) => {
    console.log(name,"name value received in controller");

    try {
        const brandContent = await BrandContent.findOne({ name:name});
        if (!brandContent) return ({ message: "Brand content not found" });
        return brandContent;
    } catch (error) {
        return error;
    }
};

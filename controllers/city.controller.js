const city = require("../models/city.model");

exports.getAllCities = async (req, res) => {
    const cities = await city.find();
    res.json(cities);
};  

exports.getCityByName = async (name, actualName) => {
    try {
        if (!name) {
            return { message: "City name is required" };
        }

        const cityData = await city.findOne({ name });
        //console.log(cityData, "city");

        if (!cityData) {
            return { message: "City not found" };
        }

        // Check if `actualName` exists in the `content` array
        const contentArray = cityData.content;
        console.log(contentArray, "contentArray");
        if (Array.isArray(contentArray) && contentArray.includes(actualName)) {
            console.log("found");
            return true;
        }

        return false; // Return false if `actualName` is not in the array
    } catch (error) {
        console.error("Error fetching city:", error);
        return { message: "An error occurred while fetching the city", error };
    }
};

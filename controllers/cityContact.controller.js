

const CityContact = require("../models/cityContact.model"); // Import the cityContact model;

const getAllCityContacts = async (req, res) => {
    const cityContacts = await CityContact.find();
    res.json(cityContacts);
};

const getCityContactByName = async (name) => {

    const cityContact = await CityContact.findOne({ name :name });   
    console.log(cityContact);         
    return (cityContact);
};


module.exports = {
    getAllCityContacts,
    getCityContactByName
};
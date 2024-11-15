const express = require("express");
const router = express.Router();
const cityContactController = require("../controllers/cityContact.controller");

router.get("/city-contacts", cityContactController.getAllCityContacts);
router.get("/city-contact/:name", cityContactController.getCityContactByName);

module.exports = router;
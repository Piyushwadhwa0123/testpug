const express = require("express");
const router = express.Router();
const brandContentController = require("../controllers/brandContent.controller");

router.get("/brand-contents", brandContentController.getAllBrandContents);
router.get("/brand-content/:name", brandContentController.getBrandContentByName);

module.exports = router;

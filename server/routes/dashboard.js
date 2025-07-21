const express = require("express");
const { getOverview } = require("../controllers/dashboardController");
const router = express.Router();

router.get("/overview", getOverview);

mpodule.exports = router;

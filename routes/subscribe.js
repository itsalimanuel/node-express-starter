const express = require("express");
const router = express.Router();

const Subscribe = require("../controllers/SubscribeController");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, Subscribe.index);
router.post("/store", Subscribe.store);

module.exports = router;

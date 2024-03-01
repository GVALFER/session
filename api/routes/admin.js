const express = require("express");
const router = express.Router();
const { authProtect } = require("../utils/auth");

router.get("/", authProtect(), (req, res) => {
    res.send("This route is protected");
});

module.exports = router;

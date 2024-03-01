const express = require("express");
const router = express.Router();
const { authProtect } = require("../utils/auth");

// Define a route for getting all users
router.get("/", authProtect(), (req, res) => {
    res.send("This route is protected");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { authProtect } = require("../../utils/auth");

router.get("/", authProtect(), (req, res) => {
    return res.json({ success: true });
});

module.exports = router;

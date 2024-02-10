const express = require("express");
const path = require("path");

const router = express.Router();

// GET request
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    // console.log("router get htmlroutes notes.html");
});

// Return to Homepage 
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    // console.log("router get htmlroutes index.html");
});

module.exports = router;

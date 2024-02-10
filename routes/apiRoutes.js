const express = require('express');
const router = express.Router();
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get("/notes", (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        const notesData = JSON.parse(data);
        res.json(notesData);
    }).catch(function (err) {
        console.error(err);
        res.status(500).send("Error reading notes data.");
    });
});

router.post("/notes", (req, res) => {
    const newNote = req.body;
    readFileAsync("db/db.json", "utf8").then(function (data) {
        const notesData = JSON.parse(data);
        notesData.push(newNote);
        return writeFileAsync("db/db.json", JSON.stringify(notesData));
    }).then(function () {
        console.log("Note has been added.");
        res.json(newNote);
    }).catch(function (err) {
        console.error(err);
        res.status(500).send("Error writing note.");
    });
});

module.exports = router;

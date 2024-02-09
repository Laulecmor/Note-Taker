const express = require('express');
const router = express.Router();
const fs = require("fs");
const util = require("util");
const { join } = require('path');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get("/notes", async (req, res) => {
    try {
        const data = await readFileAsync(join(__dirname, "../db/db.json"), "utf8");
        const notesData = JSON.parse(data);
        res.json(notesData);
    } catch (error) {
        console.error("Error in GET /notes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/api/notes", async (req, res) => {
    try {
        const data = await readFileAsync(join(__dirname, "../db/db.json"), "utf8");
        const notes = JSON.parse(data);
        
    
        if (!req.body || typeof req.body.title !== 'string' || typeof req.body.text !== 'string') {
            return res.status(400).json({ error: "Invalid request body" });
        }

        const newNote = {
            title: req.body.title,
            text: req.body.text,
        };
        notes.push(newNote);
        
        await writeFileAsync(join(__dirname, "../db/db.json"), JSON.stringify(notes));
        res.json(notes);
    } catch (error) {
        console.error("Error in POST /api/notes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

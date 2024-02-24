const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fileName = './db/db.json'

router.get('/notes', (req,res) => {
    const data = fs.readFileSync(fileName, 'utf8');
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData);
});

router.post('/notes', (req, res) => {
    const data = fs.readFileSync(fileName, 'utf8');
    const parsedData = JSON.parse(data);
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    parsedData.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(parsedData));
    res.status(200).json(parsedData);
})

module.exports = router;
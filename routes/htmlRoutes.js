const express = require("express");
const path = require("path");

const router = express.Router();

const routes = [
    { path: "/", filePath: "/public/index.html" },
    { path: "/notes", filePath: "/public/notes.html" }
];

const handleRoute = (req, res, filePath) => {
    console.log(`${req.method} for ${req.path}`);
    res.sendFile(path.join(__dirname, filePath));
};

routes.forEach(({ path: routePath, filePath }) => {
    router.get(routePath, (req, res) => {
        handleRoute(req, res, filePath);
    });
});

module.exports = router;

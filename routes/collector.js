var express = require('express');
const fs = require("fs");
var router = express.Router();

const filePath = "./data/data.json";

const data = JSON.parse(fs.readFileSync(filePath).toString());

router.post('/:name', function (req, res, next) {
    const body = req.body;
    const name = req.params.name;
    console.log();
    const value = Number.parseInt(body.attiny);
    if (!value) {
        return res.status(400).send();
    }
    if (!data[name]) {
        data[name] = [];
    }

    data[name].push({
        t: new Date().getTime(),
        v: value
    })
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).send();
});

router.get('/data', function (req, res, next) {
    res.send(data);
});

module.exports = router;

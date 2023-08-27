var express = require('express');
const basicAuthMiddleware = require("../auth");
const esp = require("../esp");
var router = express.Router();


router.post('/:name', basicAuthMiddleware, function (req, res, next) {
    const body = req.body;
    const name = req.params.name;
    const value = Number.parseInt(body.attiny);
    if (!value) {
        return res.status(400).send();
    }
    esp.addData(name, value);
    res.status(200).send(esp.getConfig());
});

router.get('/data', function (req, res, next) {
    res.send(esp.getData());
});

module.exports = router;

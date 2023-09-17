var express = require('express');
const basicAuthMiddleware = require("../auth");
const esp = require("../service/esp");
const espConfig = require("../service/esp-config");
var router = express.Router();


router.post('/:name', basicAuthMiddleware, function (req, res, next) {
    const body = req.body;
    const name = req.params.name;
    const value = Number.parseInt(body.attiny);
    if (!value) {
        return res.status(400).send();
    }
    esp.addData(name, value);
    res.status(200).send(espConfig.getConfig(name));
});

router.get('/data', function (req, res, next) {
    res.send(esp.getData());
});

router.get('/data-adjusted', function (req, res, next) {
    const data = esp.getData();

    const result = {};

    function normalize(min, max) {
        var delta = max - min;
        return function (val) {
            return (val - min) / delta;
        };
    }

    Object.keys(data).forEach(esp => {
        const config = espConfig.getConfig(esp);
        const norm = normalize(config.min_value, config.max_value)
        result[esp] = data[esp].map(d => {
            return {
                t: d.t,
                v: norm(d.v) * 100
            }
        });
    });

    res.send(result);
});

module.exports = router;

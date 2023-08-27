const express = require('express');
const basicAuthMiddleware = require("../auth");
const espConfig = require("../service/esp-config");
const router = express.Router();


router.get('/config', function (req, res, next) {
    res.send(espConfig.getConfig());
});

router.post('/config', basicAuthMiddleware, function (req, res, next) {
    const config = req.body;
    if (config) {
        espConfig.setConfig(config);
    }
    res.send(espConfig.getConfig());
});

module.exports = router;

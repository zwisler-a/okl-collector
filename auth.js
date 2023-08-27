const basicAuth = require('express-basic-auth');

const basicAuthMiddleware = basicAuth({
    users: {
        [process.env.ESP_USER]: process.env.ESP_PW
    }
});

module.exports = basicAuthMiddleware;
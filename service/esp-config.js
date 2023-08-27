const fs = require("fs");


const filePath = "./data/config.json";
let config = JSON.parse(fs.readFileSync(filePath).toString());


module.exports = {
    getConfig: (espName) => {
        if (!espName) return config;
        if (config[espName]) {
            return {
                s: config[espName].sleep_time
            };
        }
        return {
            s: 60
        }
    },

    setConfig: (newConfig) => {
        config = newConfig;
        fs.writeFileSync(filePath, JSON.stringify(config));
    }
}
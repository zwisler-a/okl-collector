const fs = require("fs");


const filePath = "./data/config.json";
let config = JSON.parse(fs.readFileSync(filePath).toString());

const mapConfigToEspResponse = (config) => {
    return {
        s: config.sleep_time
    }
}

const createConfig = (espName) => {
    if (config[espName]) return config[espName];
    const newConfig = {
        sleep_time: 30
    }
    config[espName] = newConfig;
    return newConfig;
};


module.exports = {
    mapConfigToEspResponse,
    createConfig,


    getConfig: (espName) => {
        if (!espName) return config;
        if (config[espName]) {
            return mapConfigToEspResponse(config[espName]);
        } else {
            return mapConfigToEspResponse(createConfig(espName));
        }
    },

    setConfig: (newConfig) => {
        config = newConfig;
        fs.writeFileSync(filePath, JSON.stringify(config));
    }
}
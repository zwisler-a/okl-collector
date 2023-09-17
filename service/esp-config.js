const fs = require("fs");
const {mapConfigToEspResponse} = require("./esp-config");


const filePath = "./data/config.json";
let config = JSON.parse(fs.readFileSync(filePath).toString());


module.exports = {

    mapConfigToEspResponse(config) {
        return {
            s: config.sleep_time
        }
    },

    createConfig: (espName) => {
        if (config[espName]) return config[espName];
        const newConfig = {
            sleep_time: 30
        }
        config[espName] = newConfig;
        return newConfig;
    },

    getConfig: (espName) => {
        if (!espName) return config;
        if (config[espName]) {
            return this.mapConfigToEspResponse(config[espName]);
        } else {
            return this.mapConfigToEspResponse(this.createConfig(espName));
        }
    },

    setConfig: (newConfig) => {
        config = newConfig;
        fs.writeFileSync(filePath, JSON.stringify(config));
    }
}
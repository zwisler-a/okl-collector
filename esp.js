const fs = require("fs");


const filePath = "./data/data.json";
const data = JSON.parse(fs.readFileSync(filePath).toString());

module.exports = {
    getConfig: () => ({s: 60}),
    addData: (espName, value) => {
        if (!data[name]) {
            data[name] = [];
        }

        data[name].push({
            t: new Date().getTime(),
            v: value
        })
        fs.writeFileSync(filePath, JSON.stringify(data));
    },
    getData: () => data
}
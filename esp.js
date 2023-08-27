const fs = require("fs");


const filePath = "./data/data.json";
const data = JSON.parse(fs.readFileSync(filePath).toString());
let sleep_time = 60;


module.exports = {
    getConfig: () => ({s: sleep_time}),
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
    getData: () => data,
    setSleepTime: (v) => sleep_time = v
}
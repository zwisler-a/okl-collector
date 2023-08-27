const fs = require("fs");


const filePath = "./data/data.json";
const data = JSON.parse(fs.readFileSync(filePath).toString());


module.exports = {
    addData: (espName, value) => {
        if (!data[espName]) {
            data[espName] = [];
        }

        data[espName].push({
            t: new Date().getTime(),
            v: value
        })
        fs.writeFileSync(filePath, JSON.stringify(data));
    },
    getData: () => data,
}
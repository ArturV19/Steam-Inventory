import express from "express";
import fetch from "node-fetch";
const app = express();
const port = 8080; // default port to listen
function filter(data) {
    let filteredData = data.descriptions;
    filteredData = filteredData.map((item) => {
        return {
            market_hash_name: item.market_hash_name,
            tradable: item.tradable
        };
    });
    filteredData.sort((a, b) => a.market_hash_name > b.market_hash_name ? 1 : -1);
    return filteredData;
}
app.get("/", (req, res) => {
    fetch(`https://steamcommunity.com/inventory/76561199172982948/730/2?l=en`)
        .then(res => res.json())
        .then((data) => {
        res.send(filter(data));
    });
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
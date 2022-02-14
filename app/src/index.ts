import express, {response} from "express";

import fetch from "node-fetch";

const app = express();
const port = 8080; // default port to listen

type InventoryItem = {
    market_hash_name: string;
    tradable: number;
}

function filter(data: any): object {
    let filteredData = data.descriptions;
    filteredData = filteredData.map((item: InventoryItem) => {
        return {
            market_hash_name: item.market_hash_name,
            tradable: item.tradable
        }
    });
    filteredData.sort((a: InventoryItem, b: InventoryItem) => a.market_hash_name > b.market_hash_name ? 1 : -1);
    return filteredData;
}

app.get("/", (req, res) => {
    fetch(`https://steamcommunity.com/inventory/76561199172982948/730/2?l=en`)
        .then(res => res.json())
        .then((data) => {
            // @ts-ignore
            console.log(data.descriptions);
            console.log(filter(data));
            res.send(filter(data));
        });
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

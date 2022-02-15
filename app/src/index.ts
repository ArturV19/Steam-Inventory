import express from "express";

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

    function sortI(a: InventoryItem, b: InventoryItem): number {
        if (a.tradable > b.tradable) {
            return 1;
        }
        if (a.tradable < b.tradable) {
            return -1;
        }
        if (a.market_hash_name > b.market_hash_name) {
            return 1;
        }
        if (a.market_hash_name < b.market_hash_name) {
            return -1;
        }
        return 0
    }

    filteredData.sort(sortI);
    return filteredData;
}

app.get("/", (req, res) => {
    fetch(`https://steamcommunity.com/inventory/76561198004925315/570/2?l=en`)
        .then(res => res.json())
        .then((data) => {
            res.send(filter(data));
        });
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

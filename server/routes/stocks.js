const router = require("express").Router()
const pool = require("../db")

router.get("/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const stock = await pool.query(
            "SELECT numShares, boughtValue FROM stocks WHERE name = $1",
            [name]
        );
        res.json(stock.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// buy the stock (update)
router.put("/buy", async (req, res) => {
    try {
        console.log("put")
        const name = req.body.name;
        const numShares = parseInt(req.body.numShares); // oldNumShares + newNumShares (can calculate this after we do fetch)
        const boughtValue = req.body.boughtValue;
        const stock = await pool.query(
            "UPDATE stocks SET numShares = $1::integer, boughtValue = $2 WHERE name = $3",
            [numShares, boughtValue, name]
        );
        console.log(stock.rows);
        res.json(stock.rows);
    } catch (err) {
        console.error(err.message.red);
        res.status(500).send("Server Error");
    }
})

// buy the stock (new)
router.post("/buy", async (req, res) => {
    try {
        console.log(req.body)
        const name = req.body.name;
        const numShares = parseInt(req.body.numShares); // oldNumShares + newNumShares (can calculate this after we do fetch)
        const boughtValue = req.body.boughtValue;
        console.log(name, numShares, boughtValue)
        const stock = await pool.query(
            "INSERT INTO stocks (name, numShares, boughtValue, user_id) VALUES($1, $2::integer, $3, $4) RETURNING *",
            [name, numShares, boughtValue, 1]
        );
        console.log(stock.rows[0])
        res.json(stock.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// sell the stock
router.put("/sell", async (req, res) => {
    try {
        const name = req.body.name;
        const numShares = req.body.numShares;
        const stock = await pool.query(
            "UPDATE stocks SET numShares = $1 WHERE name = $1",
            [numShares, name]
        );
        res.json(stock.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})
module.exports = router;
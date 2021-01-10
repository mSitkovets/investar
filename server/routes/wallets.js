const router = require("express").Router()
const pool = require("../db")

// Get Wallets select using user
router.get("/", async (req, res) => {
    try {
        const wallet = await pool.query("SELECT * from wallets WHERE user_id = 1")
        console.log(wallet)
        res.status(200).json(wallet)
    } catch (err) {
        console.error(err.message)
    }
})
// update the wallet balance for the user
router.put("/", async (req, res) => {
    try {
        const balance = req.body.balance;
        const stock = await pool.query(
            "UPDATE wallets SET balance = $1 WHERE user_id = 1",
            [balance]
        );
        res.json(stock.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;
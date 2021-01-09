const router = require("express").Router()
const pool = require("../db")

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
const router = require("express").Router();
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const portfolio = await pool.query("SELECT * from portfolios WHERE user_id = 1 AND date = CURRENT_DATE - INTEGER '1' ")
        res.status(200).json(portfolio.rows[0].totalvalue);
    } catch (err) {
        console.error(err.message)
    }
})


module.exports = router;
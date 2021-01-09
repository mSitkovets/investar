const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_id FROM users WHERE user_id = $1",
            [1]
        );
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})
module.exports = router;
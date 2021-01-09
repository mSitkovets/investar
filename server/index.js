const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require('cors');
const pool = require('./db');

const app = express();
dotenv.config({ path: './config/config.env' })

// middleware
app.use(cors()); //connect frontend and backend
//Body parser
app.use(express.json());

app.use('/users', require('./routes/users'));
// // create a user
// app.post('/users', async (req, res) => {
//     try {
//         const first_name = req.body.first_name;
//         const last_name = req.body.first_name;
//         const email = req.body.first_name;
//         const password = req.body.first_name;
//         const newUser = await pool.query(
//             'INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
//             [first_name, last_name, email, password]
//         );
//         console.log(newUser.rows[0]);
//         res.json(newUser.rows[0]);
//     } catch (err) {
//         console.error(err.message.red);
//     }
// });

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
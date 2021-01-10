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

app.use('/stocks', require('./routes/stocks'));
app.use('/wallets', require('./routes/wallets'));
app.use('/portfolios', require('./routes/portfolios'));

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
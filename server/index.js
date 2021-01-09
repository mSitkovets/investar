const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors")

const app = express();
dotenv.config({ path: './config/config.env' })

//Body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Up And Running On Port ${PORT}`.blue.bold));
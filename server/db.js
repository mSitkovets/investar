const Pool = require("pg").Pool;

const pool = new Pool({
    user: "mariasitkovets",
    password: "passwordabc123",
    host: "localhost",
    port: 5432,
    database: "investar"
});

module.exports = pool;

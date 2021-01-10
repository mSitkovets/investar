const Pool = require("pg").Pool;

const pool = new Pool({
    // user: "mariasitkovets",
    // password: "passwordabc123",
    user: "postgres",
    password: "P@ssw0rd!",
    host: "localhost",
    port: 5432,
    database: "investar"
});

module.exports = pool;

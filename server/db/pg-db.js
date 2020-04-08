const Pool = require("pg").Pool;

const pool = new Pool({
  user: "deeroyue",
  password: "dnmV3Qca1VImSwq4E4HgEdelyqwfld_j",
  host: "drona.db.elephantsql.com",
  port: 5432,
  database: "deeroyue"
});

module.exports = pool;

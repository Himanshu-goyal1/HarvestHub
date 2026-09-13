const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zenos",
    database: "harvest_hub"
});
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("MySQL connected!");
    console.log("Connected to the database:", db.config.database);
});
module.exports = db;
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Harvest Hub backend is running!");
});
app.get("/test", (req, res) => {
    res.send("THIS IS MY SERVER");
});


app.post("/signup", async (req, res) => {

    const { name, email, password , role } = req.body;

    // Check if fields are missing
    if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

    if (role !== "buyer" && role !== "farmer") {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

    // Check password length
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    // Check email format
    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email"
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, passwordHash, role],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Something went wrong"
                });
            }

            res.status(201).json({
                message: "Account created successfully"
            });
        }
    );
});
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Check that fields exist
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Find user by email
    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Something went wrong"
            });
        }

        // User doesn't exist
        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        // Compare entered password with stored hash
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
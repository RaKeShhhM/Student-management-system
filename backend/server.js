const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();// Create Express app
app.use(cors());// Enable CORS for all routes
app.use(express.json());// Middleware to parse JSON bodies

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) console.log("DB Connection Error:", err);
    else console.log("Connected to MySQL Database");
});
const PORT =process.env.PORT || 5000;

// Route to save student
app.post('/add-student', (req, res) => {
    const { name, email, roll_no } = req.body;

    // Server-side validation
    if (!name || !email || !roll_no) {
        return res.status(400).json("All fields are required!");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json("Invalid email format!");
    }

    const q = "INSERT INTO students (roll_no, name, email) VALUES (?, ?, ?)";
    db.query(q, [roll_no, name, email], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.status(400).json("Roll No already exists");
            return res.status(500).json(err);
        }
        res.status(200).json("Success");
    });
});

// Route to get all students
app.get('/data', (req, res) => {  
    db.query("SELECT * FROM students", (err, data) => {
        if (err) return res.json(err);
        //console.log("Fetched Students:", data); // Debug log to check data format
        return res.json(data);
    });
});

// DELETE: Remove student by Roll No
app.delete('/delete-student/:roll_no', (req, res) => {
    const { roll_no } = req.params;
    const q = "DELETE FROM students WHERE roll_no = ?";
    db.query(q, [roll_no], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json("Deleted");
    });
});

// UPDATE API: Update student details
app.put('/update-student/:roll_no', (req, res) => {
    const { roll_no } = req.params;
    const { name, email } = req.body;

    // 1. Check if fields are empty
    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required for update." });
    }

    // 2. Validate email format (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    const q = "UPDATE students SET name = ?, email = ? WHERE roll_no = ?";
    
    db.query(q, [name, email, roll_no], (err, result) => {
        if (err) {
            console.error("Update Error:", err);
            return res.status(500).json({ error: "Database error occurred." });
        }

        // 3. Check if any row was actually changed
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found with that Roll No." });
        }

        return res.json({ message: "Student updated successfully" });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
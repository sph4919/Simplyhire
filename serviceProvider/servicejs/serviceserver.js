const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Import CORS
const path = require('path');


app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sugnay@2003',
    database: 'server'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

app.post('/servicelogin', (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM serviceagent WHERE email = ? AND password = ?";
    
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
        } else {
            if (results.length > 0) {
                res.json({ message: 'Login successful', email });
            } else {
                res.status(401).send('Invalid credentials');
            }
        }
    });
});








//for signup request

// app.post('/servicesignup', (req, res) => {
//     const { name, email, password } = req.body;
//     const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';

//     db.query(query, [name, email, password], (err, results) => {
//         if (err) {
//             console.error('Error querying the database:', err);
//             res.status(500).send('Error querying the database');
//             return;
//         }

//         if (results.affectedRows > 0) {
//             // Successfully inserted user
//             res.status(201).send('User created successfully');
//         } else {
//             // If user creation fails, send a 400 Bad Request
//             res.status(400).send('Failed to create user');
//         }
//     });
// });


// Additional routes can be added here

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
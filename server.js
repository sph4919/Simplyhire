const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sugnay@2003',
    database: 'server'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';

    console.log('Query:', query, [email, password]);
    

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Error querying the database');
            return;
        }
        
        if (results.length > 0) {
           
            res.sendFile(path.join( __dirname, 'main.html'));
        } else {
           
            res.status(401).send('Invalid credentials');
        }
    });
});






//for signup request

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';

    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Error querying the database');
            return;
        }

        if (results.affectedRows > 0) {
            // Successfully inserted user
            res.status(201).send('User created successfully');
        } else {
            // If user creation fails, send a 400 Bad Request
            res.status(400).send('Failed to create user');
        }
    });
});


// Additional routes can be added here

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'locatex'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/report', (req, res) => {
    const { itemType, itemName, itemDescription, itemLocation, userEmail } = req.body;
    const sql = 'INSERT INTO reports (itemType, itemName, itemDescription, itemLocation, userEmail) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [itemType, itemName, itemDescription, itemLocation, userEmail], (err, result) => {
        if (err) throw err;
        res.send('Report submitted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
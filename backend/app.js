// import express
const express = require('express');
// initiate server
const app = express();
// import bcrypt functions
const bcryptFunctions = require('./bcrypt');
console.log(bcryptFunctions);
// så vi kan läsa och skriva data till json-fil
const fs = require('fs');

app.use(express.json());

// signup
app.post('/signup', async (req, res) => {
    let credentials = {
        userName: req.body.userName,
        password: req.body.password,
        admin: req.body.admin,
    };
    const hashedPassword = await bcryptFunctions.hashPassword(credentials.password);
    credentials.password = hashedPassword;
    credentials.loggedIn = true;
    // skriva in nya användaren i vår users.json-fil
    let usersData = fs.readFileSync('users.json');
    // göra om datan vi läst in till javascript-objekt
    let usersObject = JSON.parse(usersData);
    // pusha in nya användaren till users-listan
    usersObject.users.push(credentials);
    // göra om det till JSON igen
    usersObject = JSON.stringify(usersObject);
    // uppdatera filen
    fs.writeFile('users.json', usersObject, (err) => {
        if (err) {
            console.log('det blev fel')
        }
    });
    res.send('gick ok');
});

// login
app.post('/login', (req, res) => {

});

// logout
app.post('/login', (req, res) => {

});

app.listen(5552, () => {
    console.log('app is running on server 5552');
});


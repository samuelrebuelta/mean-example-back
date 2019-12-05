const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/fetch/example', (req, res, next) => {
    const cars = ['Audi', 'Bmw', 'Mercedes', 'Volkswagen'];
    return res.status(200).json({
        message: 'Fetch example works',
        data: cars
    });
});

module.exports = app;
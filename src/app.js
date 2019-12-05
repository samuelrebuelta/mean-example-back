const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.setHeader('Access-Controll-Allow-Origin', '*');
    response.setHeader('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/brands', (request, response, next) => {
    const brands = ['Audi', 'Bmw', 'Mercedes', 'Volkswagen'];
    return response.status(200).json({
        message: 'Data fetched succesfully',
        data: brands
    });
});

app.post('/brands', (request, response, next) => {
    const post = request.body;
    console.log(post);
    response.status(201).json({
        message: 'Post added succesfully',
        data: null
    })
});

module.exports = app;
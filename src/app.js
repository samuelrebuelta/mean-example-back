const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Brand = require('./models/brand');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mean-example', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('CONNECTED TO DATABASE! :)'))
    .catch(() => console.log('CONNECTION FAILED! :('));

app.use(bodyParser.json());

app.use((request, response, next) => {
    response.setHeader('Access-Controll-Allow-Origin', '*');
    response.setHeader('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

// GET METHOD
app.get('/brands', (request, response, next) => {
    Brand.find()
        .then(data => {
            response.status(200).json({
                message: 'Data fetched succesfully',
                data: data
            });
        })
        .catch(err => console.log(err));
});

// POST METHOD
app.post('/brands', (request, response, next) => {
    const post = new Brand({
        brand: request.body.brand,
        model: request.body.model,
    });
    post.save();
    response.status(201).json({
        message: 'Post added succesfully',
        data: null
    })
});

module.exports = app;
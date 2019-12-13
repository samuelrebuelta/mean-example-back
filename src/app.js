const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const BrandController = require('./controllers/brand')

const app = express();

// LOCAL DB
// mongoose.connect('mongodb://127.0.0.1:27017/mean-example', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// CLOUD DB --- PASS: admin
mongoose.connect('mongodb+srv://admin:admin@cluster0-wt6n8.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('CONNECTED TO DATABASE! :)'))
    .catch((error) => console.log('CONNECTION FAILED! :(', error));

app.use(bodyParser.json());

app.use((request, response, next) => {
    response.setHeader('Access-Controll-Allow-Origin', '*');
    response.setHeader('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

// GET METHOD
app.get('/brands', BrandController.fetchBrands);

// POST METHOD
app.post('/brands', BrandController.postBrand);

// DELETE METHOD
app.delete('/brands/:id/delete', BrandController.deleteBrand);

module.exports = app;
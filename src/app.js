const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Brand = require('./models/brand');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mean-example', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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
        .then(data => { response.status(200).json({ message: 'Data fetched succesfully', data }); })
        .catch(error => response.status(400).json({ message: 'Error', error }));
});

// POST METHOD
app.post('/brands', (request, response, next) => {
    // Check if exist
    Brand.exists({ brandName: request.body.brandName })
        .then((alreadyExists) => {
            if (alreadyExists) {
                Brand.find({ brandName: request.body.brandName }).then(elems => {
                    const currentElement = elems[0];
                    const modelAlreadyExists = currentElement.models.some(el => el.modelDescription === request.body.modelDescription);
                    if (modelAlreadyExists) {
                        response.status(200).json({ message: 'Brand and model already exist' });
                    } else {
                        Brand.findOneAndUpdate({ brandName: request.body.brandName }, { $push: { models: { modelDescription: request.body.modelDescription } } })
                            .then(result => {
                                response.status(201).json({ message: `Model added to ${request.body.brandName} succesfully`, result });
                            })
                            .catch(error => response.status(400).json({ message: 'Error', error }));
                    }
                })

            } else {
                const brand = new Brand({
                    id: request.body._id,
                    brandName: request.body.brandName,
                    models: [{ modelDescription: request.body.modelDescription }],
                });
                brand.save()
                    .then((result) => { response.status(201).json({ message: 'Brand added succesfully', result }); })
                    .catch(error => response.status(400).json({ message: 'Error', error }));
            }
        })
        .catch(error => response.status(400).json({ message: 'Error', error }));
});

// DELETE METHOD
app.delete('/brands/:id/delete', (request, response, next) => {
    Brand.deleteOne(request.id)
        .then((result) => { response.status(200).json({ message: 'Brand deleted succesfully', result }); })
        .catch(error => response.status(400).json({ message: 'Error', error }));
});

module.exports = app;
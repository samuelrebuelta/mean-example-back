const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const BrandController = require('./controllers/brand')
const TodoController = require('./controllers/todo')

const app = express();

app.use(cors());

// LOCAL DB
mongoose.connect('mongodb://127.0.0.1:27017/mean-example', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// CLOUD DB --- PASS: admin
// mongoose.connect('mongodb+srv://admin:admin@cluster0-wt6n8.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('CONNECTED TO DATABASE! :)'))
    .catch((error) => console.log('CONNECTION FAILED! :(', error));

app.use(bodyParser.json());

// CARS MODULE:
// GET METHOD
app.get('/brands', BrandController.fetchBrands);

// POST METHOD
app.post('/brands', BrandController.postBrand);

// DELETE METHOD
app.delete('/brands/:id/delete', BrandController.deleteBrand);

// UPDATE METHOD
app.patch('/brands/:id/update', BrandController.updateBrandName);

// DELETE MODEL METHOD
app.delete('/brands/:id/models/:modelId/delete', BrandController.deleteModel);

// ----------------------------------------

// TODOLIST MODULE:
// GET METHOD
app.get('/todoList', TodoController.fetchTodoList);

// POST METHOD
app.post('/todoItem', TodoController.postItem);

// UPDATE METHOD
app.put('/todoItem/:id/update', TodoController.updateItem);

// DELETE METHOD
app.delete('/todoItem/:id/delete', TodoController.deleteItem);

module.exports = app;
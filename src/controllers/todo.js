const Todo = require('../models/todo.model');

exports.fetchTodoList = (request, response) => {
    Todo.find().sort({ creationDate: 'desc' })
        .then(data => response.status(200).json({ message: 'Data fetched succesfully', data }))
        .catch(error => response.status(500).json({ message: 'Error', error }))
};

exports.postItem = (request, response) => {
    const todo = new Todo({
        id: request.body._id,
        description: request.body.description,
        priority: 'High',
        creationDate: new Date(),
        completed: false
    });
    todo.save()
        .then(res => response.status(200).json({ message: 'Item added successfully' }))
        .catch(error => response.status(500).json({ message: 'Error', error }));
}

exports.updateItem = (request, response) => {
    const completed = request.body.completed;
    const description = request.body.description;
    Todo.findOneAndUpdate({ _id: request.params.id }, { $set: { completed, description } }, { upsert: true })
        .then(elems => response.status(200).json({ message: 'Item status updated succesfully' }))
        .catch(error => response.status(400).json({ message: 'Error', error }));
}

exports.deleteItem = (request, response) => {
    Todo.deleteOne({ _id: request.params.id })
        .then(elems => response.status(200).json({ message: 'Item deleted succesfully' }))
        .catch(error => response.status(400).json({ message: 'Error', error }));
}
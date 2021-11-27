const Todos = require('../models').Todos;

module.exports = (req, res) => {
    return Todos.create({
        title: req.body.title,
        parentId: req.body.parentId ? req.body.parentId : null
    })
    .then(todo => res.status(201).send(todo))
    .catch(err => res.status(400).send(err))
}
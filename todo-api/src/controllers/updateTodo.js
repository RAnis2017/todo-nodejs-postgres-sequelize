const Todos = require('../models').Todos;

module.exports = (req, res) => {
    return Todos.update(
        { completed: req.body.status },
        { where: { id: req.body.id } }
    )
    .then(todo => res.status(201).send(todo))
    .catch(err => res.status(400).send(err))
}
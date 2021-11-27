const Todos = require('../models').Todos;

module.exports = (req, res) => {
    return Todos.findAll({include: [
        { model: Todos, as: 'subtasks' }
    ], where: {
        parentId: null
    }})
    .then(todos => res.status(200).send(todos))
    .catch(err => res.status(400).send(err))
}
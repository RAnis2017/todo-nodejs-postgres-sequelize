const Todos = require('../models').Todos;

module.exports = (req, res) => {
    console.log(req.body)
    return Todos.create({
        title: req.body.title,
        parentId: req.body.todo_id ? req.body.todo_id : null
    })
    .then(todo => {
        if(req.body.todo_id) {
            return Todos.update(
                { status: false },
                { where: {id: req.body.todo_id } }
            ).then(updatedTodo => res.status(201).send({ success: true, data: { todo } }))
            .catch(err => res.status(400).send(err))
        } else {
            res.status(201).send({ success: true, data: { todo } })
        }
    })
    .catch(err => res.status(400).send(err))
}
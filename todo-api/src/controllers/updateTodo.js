const Todos = require('../models').Todos;
const Op = require('Sequelize').Op

module.exports = (req, res) => {
    if(req.body.todo_id !== null) {
        return Todos.update(
            { status: req.body.status },
            { where: {
                [Op.or]: [{id: req.body.id}, {parentId: req.body.todo_id}]
            } }
        ).then(todo => res.status(201).send({ success: true, data: { todo } }))
        .catch(err => res.status(400).send(err))
    } else {
        return Todos.update(
            { status: req.body.status },
            { where: { id: req.body.id } }
        ).then(todo => res.status(201).send({ success: true, data: { todo } }))
        .catch(err => res.status(400).send(err))
    }
}
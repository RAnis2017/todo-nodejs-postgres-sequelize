var express = require('express');
var router = express.Router();
var { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers');

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/', updateTodo);
router.delete('/', deleteTodo);

module.exports = router;
var express = require('express');
var router = express.Router();
var { getTodos, createTodo } = require('../controllers');

router.get('/', getTodos);
router.post('/', createTodo);

module.exports = router;
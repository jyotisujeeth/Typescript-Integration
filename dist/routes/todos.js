"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: todos.length + 1,
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json(newTodo);
});
router.delete('/:id', (req, res, next) => {
    const params = req.params;
    const id = +params.id;
    const prevLen = todos.length;
    todos = todos.filter((todo) => {
        return todo.id != id;
    });
    const newLen = todos.length;
    if (prevLen == newLen) {
        res.status(400).json({ success: false, message: "Todo not found" });
        return;
    }
    res.status(200).json({ success: true });
});
router.put('/:id', (req, res, next) => {
    const body = req.body;
    const id = +req.params.id;
    const newTodo = body.text;
    let todoPositive = false;
    todos.map(todo => {
        if (todo.id == id) {
            todoPositive = true;
            todo.text = newTodo;
            res.status(200).json(todo);
        }
    });
    if (!todoPositive) {
        res.status(400).json({ success: false, message: "todo not found" });
    }
});
exports.default = router;

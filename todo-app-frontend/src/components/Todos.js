import Context from '../store/Context';
import React from 'react';
import { Input, Button } from 'reactstrap'
import './Todos.css'
import TodoList from './TodoList';

const Todos = () => {
    return <Context.Consumer>
        {context => (
            <>
                <h3>Todo App</h3>

                <div className="addTodoList">
                    <Input />

                    <Button
                        color="primary"
                    >
                        New List
                    </Button>
                </div>
                {
                    <TodoList todos={context.todos} updateTodoStatus={context.updateTodoStatus} />
                }
            </>
        )}
    </Context.Consumer>
};

export default Todos;
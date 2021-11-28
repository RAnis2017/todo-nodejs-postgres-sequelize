import Context from '../store/Context';
import React, {useEffect, useContext} from 'react';
import { Input, Button } from 'reactstrap'
import './Todos.css'
import TodoList from './TodoList';

const Todos = () => {
    const contextState = useContext(Context);

    useEffect(() => {
        contextState.getAllTodos()
    }, [])

    useEffect(() => {
        console.log(contextState.todos)
    }, [contextState.todos])

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
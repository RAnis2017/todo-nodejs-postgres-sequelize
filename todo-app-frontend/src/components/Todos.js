import Context from '../store/Context';
import React, {useEffect, useState, useContext} from 'react';
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

    const [inputText, setInputText] = useState('')

    const handleInputSubmit = () => {
        contextState.createTodo(inputText, null)

        setInputText('')
    }

    const updateHandler = async (id, status, todo_id, e) => {
        await contextState.updateTodoStatus(id, status, todo_id, e)

        await contextState.getAllTodos()
    }

    return <Context.Consumer>
        {context => (
            <>
                <h3>Todo App</h3>

                <div className="addTodoList">
                    <Input value={inputText} onChange={(e) => setInputText(e.target.value)}/>

                    <Button
                        color="primary"
                        onClick={() => handleInputSubmit()}
                        disabled={inputText.length < 1}
                    >
                        New List
                    </Button>
                </div>
                {
                    <TodoList todos={context.todos} updateTodoStatus={updateHandler} />
                }
            </>
        )}
    </Context.Consumer>
};

export default Todos;
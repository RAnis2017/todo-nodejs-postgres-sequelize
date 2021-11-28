import Context from '../store/Context';
import React, { useState, useContext } from 'react';
import { Collapse, Card, CardBody, CardHeader, Input, Button, Form, FormGroup, Label } from 'reactstrap'
// @ts-ignore
const TodoList = ({ todos, updateTodoStatus }) => {
    const [index, setIndex] = useState(0);
    const contextState = useContext(Context);

    function toggle(newIndex) {
        if (newIndex === index) {
            setIndex(-1);
        } else {
            setIndex(newIndex);
        }
    }

    const [inputText, setInputText] = useState('')

    const handleInputSubmit = (parentId) => {
        contextState.createTodo(inputText, parentId)

        setInputText('')
    }


    return <div>
        {todos.map((todo, key) =>
            <Form>
                <Card style={{ marginBottom: '1rem' }} key={todo?.id}>
                    <CardHeader onClick={() => toggle(todo?.id)} data-event={todo?.id}>
                        <FormGroup
                            check
                            inline
                        >
                            <Input type="checkbox" checked={todo?.status} onClick={(e) => updateTodoStatus(todo?.id, todo?.status, todo?.id, e)} />
                            <Label check>
                                {todo?.title}
                            </Label>
                        </FormGroup>
                    </CardHeader>
                    <Collapse isOpen={index === todo?.id}>
                        <CardBody className="tasksList">
                            {
                                todo?.subTasks?.length > 0 ?
                                    todo?.subTasks?.map((task, index) =>
                                        <FormGroup
                                            check
                                        >
                                            <Input type="checkbox" checked={task.status} onClick={(e) => updateTodoStatus(task?.id, task?.status, null, e)} />
                                            <Label check>
                                                {index + 1} {task.title}
                                            </Label>
                                        </FormGroup>
                                    ) :
                                    <p>No steps yet. Add Some!</p>
                            }
                        </CardBody>
                        <div className="addTodoList">
                            <Input value={inputText} onChange={(e) => setInputText(e.target.value)} />

                            <Button
                                color="primary"
                                onClick={() => handleInputSubmit(todo?.id)}
                                disabled={inputText.length < 1}
                            >
                                New Step
                            </Button>
                        </div>
                    </Collapse>
                </Card>
            </Form>
        )
        }
    </div>
};

export default TodoList;
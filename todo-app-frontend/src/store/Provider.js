import Context from './Context';
import React from 'react';
import { Component } from 'react';

export default class Provider extends Component {
    apiURL = 'http://localhost:3000/api/';
    headerOptions = {
        'Content-Type': 'application/json',
        'Accept': 'application/json,text/*;q=0.99'
    }
    state = {
        todos: []
    };

    render() {
        
        const getCompletedTasksCount = (todos) => {
            todos.map((todo) => {
                todo.count = 0

                todo?.subTasks?.map((task) => {
                    if(task.status) {
                        todo.count += 1
                    }
                })
            })

            return todos
        }
        return (
            <Context.Provider
                value={{
                    todos: this.state.todos,
                    createTodo: async (title, todo_id = null) => {
                        try {
                            await fetch(this.apiURL, { method: 'POST', headers: {...this.headerOptions}, body: JSON.stringify({
                                title,
                                todo_id
                            }) }).then((response) => response.json()).then((res) => {
                                if(res.success === true) {
                                    let todo = res.data && res.data.todo ? res.data.todo : null
                                    
                                    if(todo) {
                                        if(todo_id) {
                                            let todoIndex = this.state.todos.findIndex((item) => item.id === todo.parentId)
                                            
                                            if(todoIndex > -1) {
                                                this.state.todos[todoIndex].status = false
                                                if(this.state.todos[todoIndex].subTasks) {
                                                    this.state.todos[todoIndex].subTasks.push(todo)
                                                } else {
                                                    this.state.todos[todoIndex].subTasks = [todo]
                                                }
                                                
                                            }
                                            
                                            let todos = getCompletedTasksCount([...this.state.todos])
                                            this.setState({...this.state, todos: [...todos]})
                                        } else {
                                            let todos = getCompletedTasksCount([...this.state.todos, todo])
                                            this.setState({...this.state, todos: [...todos]})
                                        }
                                    }
                                }
                            })
                        } catch(e) {
                            console.error(e)
                        }
                    },
                    updateTodoStatus: async (id, status, todo_id = null, e) => {
                        e.stopPropagation()
                        try {
                            await fetch(this.apiURL, { method: 'PUT', headers: {...this.headerOptions}, body: JSON.stringify({
                                id,
                                status: !status,
                                todo_id
                            }) }).then((response) => response.json()).then((res) => {
                                if(res.success === true) {
                                    let updated = res.data && res.data.todo && res.data.todo[0] > 0
                                    
                                    if(updated) {
                                       console.log('Updated')
                                    }
                                }
                            })
                        } catch(e) {
                            console.error(e)
                        }
                    },
                    deleteTodo: async (id) => {
                        console.log('using fetch to delete todo!') // Not Required to USE
                    },
                    getAllTodos: async () => {
                        try {
                            await fetch(this.apiURL, { method: 'GET', headers: {...this.headerOptions} }).then((response) => response.json()).then((res) => {
                                if(res.success === true) {
                                    let todos = res.data && res.data.todos ? res.data.todos : []
                                    todos.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

                                    todos = todos.map((item) => {
                                        if(item.subTasks) {
                                            item.subTasks.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
                                        }
                                        
                                        return item
                                    })

                                    todos = getCompletedTasksCount([...todos])
                                    this.setState({...this.state, todos})
                                    console.log('using fetch to get all todos!',res)
                                }
                            })
                        } catch(e) {
                            console.error(e)
                        }
                    }
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
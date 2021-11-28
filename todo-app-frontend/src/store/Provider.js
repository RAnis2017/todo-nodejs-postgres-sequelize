import Context from './Context';
import React from 'react';
import { Component } from 'react';

export default class Provider extends Component {
    apiURL = 'http://localhost:3000/api/';
    headerOptions = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/json,text/*;q=0.99'
    }
    state = {
        todos: []
    };

    render() {
        return (
            <Context.Provider
                value={{
                    todos: this.state.todos,
                    createTodo: (title, parentId = null) => {
                        console.log('using fetch to add a new todo to the db!')
                    },
                    updateTodoStatus: (id, currentStatus, taskId = null, e) => {
                        e.stopPropagation()
                        console.log('using fetch to change todo status!', id, currentStatus, taskId)
                    },
                    deleteTodo: (id) => {
                        console.log('using fetch to delete todo!')
                    },
                    getAllTodos: async () => {
                        try {
                            await fetch(this.apiURL, { method: 'GET', ...this.headerOptions }).then((response) => response.json()).then((res) => {
                                if(res.success === true) {
                                    let todos = res.data && res.data.todos ? res.data.todos : []
                                    
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
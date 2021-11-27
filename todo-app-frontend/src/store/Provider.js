import Context from './Context';
import React from 'react';
import { Component } from 'react';

export default class Provider extends Component {
    state = {
        todos: [{
            id: 1,
            title: 'Hard Coded Test Todo',
            status: true,
            parentId: null,
            subTasks: [] 
        },{
            id: 2,
            title: 'Commit All Code',
            status: false,
            parentId: null,
            subTasks: [{
                id: 4,
                title: 'Committed Backend Code',
                status: false
            },{
                id: 5,
                title: 'Committed Frontend Code',
                status: true
            }] 
        },{
            id: 3,
            title: 'Work Tomorrow as well',
            parentId: null,
            subTasks: [] 
        }]
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
                    getAllTodos: () => {
                        console.log('using fetch to get all todos!')
                    }
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoList from '../components/TodoList'

describe('TodoList Component', () => {
    const todos = [
        {
            "id": 1,
            "title":
                "Clean home",
            "parentId": null,
            "status": false,
            "createdAt": "2021-11-28T11:19:38.249Z",
            "updatedAt": "2021-11-28T12:41:03.824Z",
            "subTasks": [{ "id": 3, "title": "iron clothes", "parentId": 1, "status": false, "createdAt": "2021-11-28T11:31:17.715Z", "updatedAt": "2021-11-28T12:41:03.824Z" }, { "id": 2, "title": "wash dishes", "parentId": 1, "status": true, "createdAt": "2021-11-28T11:27:40.955Z", "updatedAt": "2021-11-28T12:41:04.394Z" }]
        },
        {
            "id": 4,
            "title": "Car Maintenance",
            "parentId": null,
            "status": false,
            "createdAt": "2021-11-28T11:31:49.062Z",
            "updatedAt": "2021-11-28T11:46:51.546Z",
            "subTasks": [{ "id": 5, "title": "Clean car", "parentId": 4, "status": true, "createdAt": "2021-11-28T11:31:55.230Z", "updatedAt": "2021-11-28T11:46:57.605Z" }]
        },
        {
            "id": 6,
            "title": "Move into new home",
            "parentId": null,
            "status": false,
            "createdAt": "2021-11-28T11:33:13.193Z",
            "updatedAt": "2021-11-28T11:46:53.794Z",
            "subTasks": [{ "id": 7, "title": "Home shopping", "parentId": 6, "status": false, "createdAt": "2021-11-28T11:33:22.868Z", "updatedAt": "2021-11-28T11:47:02.742Z" }, { "id": 9, "title": "furniture", "parentId": 6, "status": false, "createdAt": "2021-11-28T11:33:43.545Z", "updatedAt": "2021-11-28T11:47:03.067Z" }, { "id": 8, "title": "Clothes buying", "parentId": 6, "status": true, "createdAt": "2021-11-28T11:33:32.748Z", "updatedAt": "2021-11-28T11:47:04.222Z" }]
        },
        {
            "id": 10,
            "title": "New List ",
            "parentId": null,
            "status": false,
            "createdAt": "2021-11-28T12:41:11.033Z",
            "updatedAt": "2021-11-28T12:41:11.033Z",
            "subTasks": []
        }]

    const updateHandler = async (id, status, todo_id, e) => {
        let todoIndex = todos.findIndex(item => item.id === id)
        todos.map((todoItem) => {
            let todoTaskIndex = todoTaskIndex = todoItem.subTasks.findIndex(item => item.id === id)
            if (todoTaskIndex > -1) {
                todoItem[todoTaskIndex].status = !status
            }
        })
        if (todoIndex > -1) {
            if (todo_id !== null) {
                todos[todoIndex].status = !status
            }
        }
    }
    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() })
    })

    it('renders correctly', () => {
        const component = shallow(<TodoList />)
        expect(component).toMatchSnapshot()
    })

    describe('new todo list item is made', () => {

        it('input for new todo list item working', () => {
            const component = mount(<TodoList todos={todos} />)
            component.find('.addTodoList > .inputText').first().simulate("change", { target: { value: 'New Test Todo List' } })
            expect(component.find('.addTodoList > .inputText').get(0).props.value).toEqual('New Test Todo List')
        })

        it('button click on input for new todo list working', () => {

            const component = mount(<TodoList todos={todos} />)
            component.find('.addTodoList > .inputText').first().simulate("change", { target: { value: 'New Test Todo List' } })
            expect(component.find('.addTodoList > .inputText').get(0).props.value).toEqual('New Test Todo List')

            component.find('.addTodoList > .inputButton').first().simulate('click');

            expect(component.find('.addTodoList > .inputText').get(0).props.value).toEqual('')
        })

        it('check if accordion toggle working', () => {
            const component = mount(<TodoList todos={todos} />)
            component.find('.card-header').first().simulate("click")
            expect(component.find('.show')).toBeTruthy()
        })

        it('check if clicking same accordion toggle working', async () => {
            const component = mount(<TodoList todos={todos} />)
            component.find('.accordionToggle').first().simulate("click")

            expect(component.find('.collapse').exists()).toBeTruthy()

            component.find('.card-header').first().simulate("click")
            expect(component.find('.collapse').exists()).toBeTruthy()
        })

        it('check if clicking list checkbox to change status works', async () => {

            const component = mount(<TodoList todos={todos} updateTodoStatus={updateHandler} />)

            let checkbox = component.find('.accordionToggle .statusCheckBox').first();

            checkbox.simulate('click')

            expect(component.find('.accordionToggle .statusCheckBox').first().props()).toBeTruthy()

        })

        it('check if clicking task checkbox to change status works', async () => {
            const component = mount(<TodoList todos={todos} updateTodoStatus={updateHandler} />)

            let checkbox = component.find('.tasksList .statusCheckBox').first();

            checkbox.simulate('click')

            expect(component.find('.tasksList .statusCheckBox').first().props()).toBeTruthy()

        })
    })
})
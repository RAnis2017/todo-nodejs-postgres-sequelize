import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Todos from '../components/Todos'

describe('Todo Component', () => {

    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() })
    })

    it('render correctly', () => {
        const component = shallow(<Todos />)
        expect(component).toMatchSnapshot()
    })

    describe('new todo list is made', () => {

        it('input for new todo list working', () => {
            const component = mount(<Todos />)
            component.find('.addTodoList > .inputText').simulate("change", {target: {value: 'New Test Todo List'}})
            expect(component.find('.addTodoList > .inputText').get(0).props.value).toEqual('New Test Todo List')
        })

        it('button click on input for new todo list working', () => {
            const component = mount(<Todos />)
            component.find('.addTodoList > .inputText').simulate("change", {target: {value: 'New Test Todo List'}})
            expect(component.find('.addTodoList > .inputText').get(0).props.value).toEqual('New Test Todo List')

            component.find('.addTodoList > .inputButton').simulate('click');

            expect(component.find('.addTodoList > .inputText').get(0).props.value).toEqual('')
        })
    })
})
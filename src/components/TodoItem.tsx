import classNames = require("classnames");
import * as React from 'react';
import { ITodo } from "../types";
import TodoTextInput from "./TodoTextInput";

interface ITodoItemProps {
    todo: ITodo;
    editTodo: (todo:ITodo, text:string)=>void;
    deleteTodo: (todo:ITodo)=>void;
    completeTodo: (todo:ITodo)=>void;
    key?: any;
}
interface ITodoItemState {
    editing: boolean;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
    constructor(props: ITodoItemProps, context: any) {
        super(props, context);
        this.state = {
            editing: false
        };
    }

    handleDoubleClick() {
        this.setState({ editing: true });
    }

    handleSave(todo:ITodo, text:string) {
        if (text.length === 0) {
            this.props.deleteTodo(todo);
        } else {
            this.props.editTodo(todo, text);
        }
        this.setState({ editing: false });
    }

    render() {
        const {todo, completeTodo, deleteTodo} = this.props;

        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.text}
                               editing={this.state.editing}
                               onSave={(text) => this.handleSave(todo, text)}/>
            );
        } else {
            element = (
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           checked={todo.completed}
                           onChange={() => completeTodo(todo)} />
                    <label onDoubleClick={this.handleDoubleClick.bind(this)}>
                        {todo.text}
                    </label>
                    <button className="destroy"
                            onClick={() => deleteTodo(todo)} />
                </div>
            );
        }

        return (
            <li className={classNames({
                completed: todo.completed,
                editing: this.state.editing
            })}>
                {element}
            </li>
        );
    }
}

export default TodoItem;

import * as React from 'react';
import { ITodo } from "../App";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants";
import Footer from './Footer';
import TodoItem from './TodoItem';

const TODO_FILTERS :ITodoFilters = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: (todo: ITodo) => !todo.completed,
    [SHOW_COMPLETED]: (todo: ITodo) => todo.completed
};

interface ITodoFilters {
    [key: string]: any;
}

interface ITodoListProps {
    todos: ITodo[];
    clearCompleted: ()=>void;
    completeAll: ()=>void;
    editTodo: (todo:ITodo, text:string)=>void;
    completeTodo: (todo:ITodo)=>void;
    deleteTodo: (todo:ITodo)=>void;
}
interface ITodoListState {
    filter: string;
}

class TodoList extends React.Component<ITodoListProps, ITodoListState> {
    constructor(props:ITodoListProps) {
        super(props);
        this.state = { filter: SHOW_ALL };
    }

    handleClearCompleted() {
        const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
        if (atLeastOneCompleted) {
            this.props.clearCompleted();
        }
    }

    handleShow(filter:string) {
        this.setState({ filter });
    }

    render() {
        const { todos,completeTodo, deleteTodo, editTodo, completeAll } = this.props;
        const { filter} = this.state;
        const filteredTodos : ITodo[]= todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce((count, todo) =>
                todo.completed ? count + 1 : count, 0
        );
        const activeCount = todos.length - completedCount;
        return (
            <section className="main">
                {todos.length > 0 &&
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={() => completeAll()} />}
                <ul className="todo-list">
                    {filteredTodos.map(todo =>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            editTodo={editTodo}
                            completeTodo={completeTodo}
                            deleteTodo={deleteTodo}/>
                    )}
                </ul>
                {todos.length > 0 &&
                <Footer
                    completedCount={completedCount}
                    activeCount={activeCount}
                    filter={filter}
                    onClearCompleted={this.handleClearCompleted.bind(this)}
                    onShow={this.handleShow.bind(this)} />}
            </section>
        );
    }
}

export default TodoList;

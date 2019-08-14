import * as React from 'react';
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants";
import { ITodo } from "../types";

import Footer from './Footer';
import TodoItem from './TodoItem';


const TODO_FILTERS :ITodoFilters = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: (todo: any) => !todo.completed,
    [SHOW_COMPLETED]: (todo: any) => todo.completed
};

interface ITodoFilters {
    [key: string]: any;
}

interface IMainSectionProps {
    todos: ITodo[];
    clearCompleted: ()=>void;
    completeAll: ()=>void;
    editTodo: (todo:ITodo, text:string)=>void;
    completeTodo: (todo:ITodo)=>void;
    deleteTodo: (todo:ITodo)=>void;
}
interface IMainSectionState {
    filter: string;
}

class MainSection extends React.Component<IMainSectionProps, IMainSectionState> {
    constructor(props:IMainSectionProps, context:any) {
        super(props, context);
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

    renderToggleAll(completedCount:number):any {
        const { todos, completeAll } = this.props;
        if (todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={() => completeAll()} />
            );
        }
    }

    renderFooter(completedCount:number):any {
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount = todos.length - completedCount;

        if (todos.length) {
            return (
                <Footer completedCount={completedCount}
                        activeCount={activeCount}
                        filter={filter}
                        onClearCompleted={this.handleClearCompleted.bind(this)}
                        onShow={this.handleShow.bind(this)} />
            );
        }
    }


    render() {
        const { todos, completeTodo, deleteTodo, editTodo } = this.props;
        const { filter } = this.state;

        const filteredTodos : ITodo[]= todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce((count: number, todo): number =>
                todo.completed ? count + 1 : count,
            0
        );

        return (
            <section className="main">
                {this.renderToggleAll(completedCount)}
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
                {this.renderFooter(completedCount)}
            </section>
        );
    }
}

export default MainSection;

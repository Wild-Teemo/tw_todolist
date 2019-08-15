import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "todomvc-app-css/index.css";
import "todomvc-common/base";
import "todomvc-common/base.css";
import { addTodo, clearCompleted, completeAll, completeTodo, deleteTodo, editTodo } from "./actions/actions";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export interface ITodo {
    id?: number;
    text: string;
    completed: boolean;
}

export interface IAppState {
    reducers: ITodo[];
}

interface IAppProps {
    todos: ITodo[];
    addTodo: (text: string) => void;
    editTodo: (todo: ITodo, text: string) => void;
    deleteTodo: (todo: ITodo) => void;
    completeTodo: (todo: ITodo) => void;
    clearCompleted: ()=>void;
    completeAll: ()=>void;
}

class App extends React.Component<IAppProps> {
    render() {
        const {todos, addTodo, editTodo, deleteTodo, completeTodo, clearCompleted, completeAll} = this.props;
        return (
            <div className="todoapp">
                <Header addTodo={addTodo}/>
                <TodoList
                    todos={todos}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                    clearCompleted={clearCompleted}
                    completeAll={completeAll}/>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
    addTodo: (text: string) => dispatch(addTodo(text)),
    editTodo: (todo: ITodo, text: string) => dispatch(editTodo(todo, text)),
    deleteTodo: (todo: ITodo) => dispatch(deleteTodo(todo)),
    completeTodo: (todo: ITodo) => dispatch(completeTodo(todo)),
    clearCompleted: () => dispatch(clearCompleted()),
    completeAll: () => dispatch(completeAll())
});

const mapStateToProps = (state: IAppState) => {
    return {
        todos: state.reducers
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

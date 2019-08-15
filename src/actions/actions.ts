import {createAction} from 'redux-actions';
import { ITodo } from "../App";
import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_ALL, COMPLETE_TODO, DELETE_TODO, EDIT_TODO } from "../constants";

const addTodo = createAction<ITodo, string>(
    ADD_TODO,
    (text: string) => ({ text, completed: false })
);

const deleteTodo = createAction<ITodo, ITodo>(
    DELETE_TODO,
    (todo: ITodo) => todo
);

const editTodo = createAction<ITodo, ITodo, string>(
    EDIT_TODO,
    (todo:ITodo, newText: string) => ({ ...todo, text: newText })
);

const completeTodo = createAction<ITodo, ITodo>(
    COMPLETE_TODO,
    (todo: ITodo) => todo
);

const completeAll = createAction<void>(
    COMPLETE_ALL,
    () => { }
);

const clearCompleted = createAction<void>(
    CLEAR_COMPLETED,
    () => { }
);

export {
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    completeAll,
    clearCompleted
};

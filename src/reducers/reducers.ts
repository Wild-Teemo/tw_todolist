import { Action, handleActions } from 'redux-actions';
import { ITodo } from "../App";
import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_ALL, COMPLETE_TODO, DELETE_TODO, EDIT_TODO } from "../constants";


const initialState: ITodo[] = [];

export default handleActions<ITodo[],ITodo>({
    [ADD_TODO]: (state: ITodo[], action: Action<ITodo>): ITodo[] => {
        return [{
            id: state.reduce((maxId, todo) => Math.max(todo.id || 0, maxId), -1) + 1,
            completed: action.payload.completed,
            text: action.payload.text
        }, ...state];
    },

    [DELETE_TODO]: (state: ITodo[], action: Action<ITodo>): ITodo[] => {
        return state.filter(todo =>
            todo.id !== action.payload.id
        );
    },

    [EDIT_TODO]: (state: ITodo[], action: Action<ITodo>): ITodo[] => {
        return state.map(todo =>
            todo.id === action.payload.id
                ? { ...todo, text: action.payload.text }
                : todo
        );
    },

    [COMPLETE_TODO]: (state: ITodo[], action: Action<ITodo>): ITodo[] => {
        return state.map(todo =>
            todo.id === action.payload.id ?
                { ...todo, completed: !todo.completed } :
                todo
        );
    },

    [COMPLETE_ALL]: (state: ITodo[]): ITodo[] => {
        const areAllMarked = state.every(todo => todo.completed);
        return state.map(todo => ({ ...todo,
            completed: !areAllMarked
        }));
    },

    [CLEAR_COMPLETED]: (state: ITodo[]): ITodo[] => {
        return state.filter(todo => !todo.completed);
    }
}, initialState);

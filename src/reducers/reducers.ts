import { Action, handleActions } from 'redux-actions';
import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_ALL, COMPLETE_TODO, DELETE_TODO, EDIT_TODO } from "../constants";
import { IState, ITodo } from "../types";


const initialState: IState = [{
    text: 'Use Redux with TypeScript',
    completed: false,
    id: 0
} as ITodo];

export default handleActions<IState, ITodo>({
    [ADD_TODO]: (state: IState, action: Action<ITodo>): IState => {
        return [{
            id: state.reduce((maxId, todo) => Math.max(todo.id || 0, maxId), -1) + 1,
            completed: action.payload.completed,
            text: action.payload.text
        }, ...state] as ITodo[];
    },

    [DELETE_TODO]: (state: IState, action: Action<ITodo>): IState => {
        return state.filter(todo =>
            todo.id !== action.payload.id
        );
    },

    [EDIT_TODO]: (state: IState, action: Action<ITodo>): IState => {
        return state.map(todo =>
            todo.id === action.payload.id
                ? { ...todo, text: action.payload.text }
                : todo
        ) as IState;
    },

    [COMPLETE_TODO]: (state: IState, action: Action<ITodo>): IState => {
        return state.map(todo =>
            todo.id === action.payload.id ?
                { ...todo, completed: !todo.completed } :
                todo
        ) as IState;
    },

    [COMPLETE_ALL]: (state: IState): IState => {
        const areAllMarked = state.every(todo => todo.completed);
        return state.map(todo => ({ ...todo,
            completed: !areAllMarked
        })) as IState;
    },

    [CLEAR_COMPLETED]: (state: IState): IState => {
        return state.filter(todo => !todo.completed);
    }
}, initialState);

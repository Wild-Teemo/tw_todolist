import * as React from 'react';
import {connect} from 'react-redux';
import { Dispatch} from "redux";
import { todoListAdd } from "../redux/actions/todoListAdd";

class Todolist extends React.Component<any,any> {
    render() {
        return (
            <div>
                <h1>TodoList</h1>
                <input className='new-todo'
                       placeholder='What needs to be done?'
                       autoFocus={true}
                      onKeyDown={this.onKeyDown}
                />
                       </div>
        );
    }

    onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && e.currentTarget.value !== '') {
            this.props.addTodo(e.currentTarget.value);
            e.currentTarget.value = '';
        }
    };
}


const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    addTodo: (value: string) => {
        dispatch(todoListAdd(value));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Todolist);


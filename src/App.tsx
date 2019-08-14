import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import 'todomvc-app-css/index.css';
import 'todomvc-common/base';
import 'todomvc-common/base.css';
import { addTodo, clearCompleted, completeAll, completeTodo, deleteTodo, editTodo } from "./actions/actions";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import { ITodo } from "./types";
interface IAppProps {
  todos: ITodo[];
  dispatch: Dispatch;
}

class App extends React.Component<IAppProps> {
  render() {
    const { todos, dispatch } = this.props;
    return (
        <div className="todoapp">
          <Header addTodo={(text: string) => dispatch(addTodo(text))} />
          <MainSection
              todos={todos}
              editTodo={(t,s) => dispatch(editTodo(t, s))}
              deleteTodo={(t: ITodo) => dispatch(deleteTodo(t))}
              completeTodo={(t: ITodo) => dispatch(completeTodo(t))}
              clearCompleted={() => dispatch(clearCompleted())}
              completeAll={() => dispatch(completeAll())}/>
        </div>
    );
  }
}

const mapStateToProps = (state:any) => {
  return {
    todos: state.reducers
  };
};

export default connect(mapStateToProps)(App);

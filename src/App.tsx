import * as React from 'react';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base';
import 'todomvc-common/base.css';
import './App.css';
import TodoList from './components/Todolist';

class App extends React.Component<any> {
  render() {
    return (
          <TodoList />
    );
  }
}



export default App;



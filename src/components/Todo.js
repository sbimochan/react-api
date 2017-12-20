import React, {Component} from 'react';
import {fetchPages} from '../services/api';
import Create from './Create';
import Search from './Search';
import './Todo.css';
import TodoList from './TodoList';
import {updateTodo} from '../services/api';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      "description": '',
      editTodoId: null
    };
    this.onDeleteTodo = this
      .onDeleteTodo
      .bind(this);
    this.editTodo = this
      .editTodo
      .bind(this);
    this.handleUpdateChange = this
      .handleUpdateChange
      .bind(this);
    this.handleUpdate = this
      .handleUpdate
      .bind(this);

  }

  componentDidMount() {
    //AJAX
    fetchPages('users/3/todo').then(todoList => {
      this
        .setState(function () {
          return {todoList: todoList}
        })
    });
  }
  onDeleteTodo(todoList) {
    this.setState({todoList: todoList});
  }
  editTodo(todoId) {
    this.setState({editTodoId: todoId});
  }
  handleUpdateChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({"description": value})
  }

  handleUpdate(event) {
    event.preventDefault();
    let formatData = {
      "description": this.state.description
    }
    updateTodo('users/3/todo/', this.state.editTodoId, formatData)
    .then(() => fetchPages('users/3/todo').then(todoList =>{
      this.setState(function(){
        return {todoList:todoList};
      })
    }));
  }

  render() {
    return (

      <div>
        <div className="header">Todo-lists</div>
        <Search
          onSearchTodo={todoList => {
          this
            .setState(function () {
              return {todoList: todoList}
            })
        }}/>
        <Create
          onUpdateTodo={todoList => {
          this
            .setState(function () {
              return {todoList: todoList}
            })
        }}/>
        <div id="todoEditBox">

          <h1>Update todo</h1>
          <form onSubmit={this.handleUpdate}>
            <div>Todo:

              <input
                type="text"
                id="todoBox"
                name="description"
                
                onChange={this.handleUpdateChange}
                editTodo={this.editTodo}/></div>
          </form>
        </div>
        <div className="todoCount">
        Todo count:<span className="badge">{this.state.todoList.length}</span>
        </div>
        <TodoList 
          editTodo={this.editTodo}
          todoList={this.state.todoList}
          onDeleteTodo={this.onDeleteTodo}/>
      </div>
    )
  }
}

export default Todo;
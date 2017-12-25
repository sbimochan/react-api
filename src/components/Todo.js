/**Global imports */
import React from 'react';
import {Component} from 'react';

/**Local imports */
import './Todo.css';
import Create from './Create';
import Search from './Search';
import TodoList from './TodoList';
import {fetchPages, logout} from '../services/api';
import { addTodo, searchTodo, deleteTodo} from '../services/api';


export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      "description": '',
      editTodoId: null,
      "searchbar": ''
    };
    this.onDeleteTodo = this.onDeleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    this.onUpdateTodo = this.onUpdateTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  onUpdateTodo(todoList){
    this.setState({todoList:todoList});
  }
  
  handleUpdateChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({"description": value})
  }
  handleLogout(event) {
    event.preventDefault();
    logout('logout');
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    addTodo('users/3/todo', this.state)
      .then(() => fetchPages('users/3/todo')
        .then(todoList => {
          this.onUpdateTodo(todoList)
        }));
  }
  handleSearch(event) {
    event.preventDefault();
    // console.log(event.target.value);
    let value = event.target.value
    this.setState({ "searchbar": value })
    searchTodo('users/3/todo', event.target.value).then(result => this.setState( {todoList:result}) )
  }

  handleDelete(event) {
    event.preventDefault();
    let todoId = event.target.value;
    deleteTodo('users/3/todo/', todoId)
      .then(() => fetchPages('users/3/todo')
        .then(todoList => {
          this.onDeleteTodo(todoList)
        }));
  }

  render() {
    return (

      <div>
        <div className="header">Todo-lists
        <button type="submit" className="button btn-danger" onClick={this.handleLogout}>Logout</button>
        </div>
        <Search handleSearch={this.handleSearch}
         />
        <Create handleSubmit = {this.handleSubmit} 
        value ={this.state.description}
         handleInputChange = {this.handleInputChange}
          onUpdateTodo={todoList => {
          this
            .setState(function () {
              return {todoList: todoList}
            })
        }}/>
     
        <div className="todoCount">
        Todo count:<span className="badge">{this.state.todoList.length}</span>
        </div>
        <TodoList 
          editTodo={this.editTodo} handleDelete={this.handleDelete}
          todoList={this.state.todoList}
          onDeleteTodo={this.onDeleteTodo} onUpdateTodo={this.onUpdateTodo}/>
      </div>
    )
  }
}

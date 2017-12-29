/**Global imports */
import React from 'react';
import {Component} from 'react';
import { Link } from 'react-router-dom';
import connect from 'react-redux/lib/connect/connect';

/**Local imports */
import './Todo.css';
import Create from './Create';
import Search from './Search';
import TodoList from './TodoList';
import UpdateBox from './UpdateBox';
import * as ApiServices from '../services/api';
import * as todoActions from './actions/action';

class Todo extends Component {

  getData = (todoData) => this.editTodo(todoData);
  handleLogout = (event) => ApiServices.logout('logout');
  getTodoId = (id) => this.props.dispatch(todoActions.getTodoId(id));
  editTodo = (todoData) => this.props.dispatch(todoActions.editTodo(todoData));
  onUpdateTodo = (todoList) => this.props.dispatch(todoActions.changeTodoList(todoList))
  onDeleteTodo = (todoList) => this.props.dispatch(todoActions.changeTodoList(todoList));
  handleUpdateChange=(event)=>this.props.dispatch(todoActions.changeDescription(event.target.value));
  handleInputChange = (event) => this.props.dispatch(todoActions.changeDescription(event.target.value));
  handleInputChangeOfUpdate = (event) =>this.props.dispatch(todoActions.editTodo(event.target.value));
  
  handleSubmit = (event) => {
    event.preventDefault();
    ApiServices.addTodo('users/3/todo', this.props)
      .then(() => ApiServices.fetchPages('users/3/todo')
        .then(todoList => {
          this.onUpdateTodo(todoList)
        })); 
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.props.dispatch(todoActions.handleSearch(event.target.value));
    ApiServices.searchTodo('users/3/todo', event.target.value)
    .then(result => this.props.dispatch(todoActions.changeTodoList(result)));
  }

  handleDelete = (event) => {
    event.preventDefault();
    ApiServices.deleteTodo('users/3/todo/', event.target.value)
      .then(() => ApiServices.fetchPages('users/3/todo')
        .then(todoList => {
          this.onDeleteTodo(todoList);
        }));
  }

  handleEdit = (event)=> {
    event.preventDefault();
    this.getTodoId(event.target.dataset.key);
    this.getData(event.target.value);
    this.props.dispatch(todoActions.changeTogglePopUp(true));
  }

  handleUpdate = (event) => {
    event.preventDefault();
    const formatData = {
      description: this.props.editTodo
    }
    ApiServices.updateTodo('users/3/todo/', this.props.editTodoId, formatData)
      .then(() => ApiServices.fetchPages('users/3/todo').then(todoList => {
        this.onUpdateTodo(todoList);
        this.props.dispatch(todoActions.changeTogglePopUp(false));
      }));
  }
 
  componentDidMount() {
    ApiServices.fetchPages('users/3/todo').then(todoList => {
      this.props.dispatch(todoActions.changeTodoList(todoList));
    });
    ApiServices.fetchTags('/tags').then(tags =>
      this.props.dispatch(todoActions.fetchTags(tags))
    );
  }
  checkboxChange = (event) => {
    const tags = this.props.tags;
    let index;
    if(event.target.checked){
      tags.push(+event.target.value); //+ is to convert into integer
    }else{
      index = tags.indexOf(+event.target.value);
      tags.splice(index,1);
    }
    this.props.dispatch(todoActions.checkboxChange(tags));
  }
  
  render() {
    return (
      <div>
        <div className="header">Todo-lists
          <Link to= "/logout" className="button btn-danger" onClick={this.handleLogout}>Logout</Link>
        </div>
        <Search handleSearch={this.handleSearch}/>
        <div className="todoCount">
          Todo count:<span className="badge">{this.props.todoList.length}</span>
        </div>
        <TodoList 
         handleEdit={this.handleEdit}
          editTodo={this.editTodo} handleDelete={this.handleDelete}
          todoList={this.props.todoList} getData = {this.getData}
          onDeleteTodo={this.onDeleteTodo}/> 
        <Create handleSubmit={this.handleSubmit} fetchTags={this.props.tagsList} checkboxChange={this.checkboxChange}
          value={this.props.description}
          handleInputChange={this.handleInputChange}
          onUpdateTodo={todoList => {
            this.props.dispatch(todoActions.changeTodoList(todoList));
          }} />
        <UpdateBox prevData={this.props.editTodo}
          handleInputChangeOfUpdate={this.handleInputChangeOfUpdate}
          todoId={this.props.editTodoId}
          handleUpdate={this.handleUpdate}
          isDisplay={this.props.togglePopUp ? "displayOn" : "displayOff"}/>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
return state;
}
const todoApp = connect(mapStateToProps)(Todo);
export default todoApp;
/**Global imports */
import React from 'react';
import {Component} from 'react';

/**Local imports */
import './Todo.css';
import Create from './Create';
import Search from './Search';
import TodoList from './TodoList';
import UpdateBox from './UpdateBox';
import * as ApiServices from '../services/api';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      "description": '',
      editTodo: '',
      editTodoId:null,
      "searchbar": '',
      togglePopUp: false
    };
    this.onDeleteTodo = this.onDeleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    this.onUpdateTodo = this.onUpdateTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeOfUpdate = this.handleInputChangeOfUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeTogglePopUp = this.changeTogglePopUp.bind(this);
    this.getData = this.getData.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    //AJAX
    ApiServices.fetchPages('users/3/todo').then(todoList => {
      this.setState(function () {
          return {todoList: todoList}
        })
    });
  }

  onDeleteTodo(todoList) {
    this.setState({todoList: todoList});
  }

  editTodo(todoData) {
    this.setState({editTodo: todoData});
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
    ApiServices.logout('logout');
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value })
  }
  handleInputChangeOfUpdate(event) {
    this.setState({
      editTodo: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    ApiServices.addTodo('users/3/todo', this.state)
      .then(() => ApiServices.fetchPages('users/3/todo')
        .then(todoList => {
          this.onUpdateTodo(todoList)
        }));
  }
  handleSearch(event) {
    event.preventDefault();
    this.setState({ "searchbar": event.target.value })
    ApiServices.searchTodo('users/3/todo', event.target.value).then(result => this.setState( {todoList:result}) )
  }

  handleDelete(event) {
    event.preventDefault();
    ApiServices.deleteTodo('users/3/todo/', event.target.value)
      .then(() => ApiServices.fetchPages('users/3/todo')
        .then(todoList => {
          this.onDeleteTodo(todoList)
        }));
  }
  getData(todoData) {
    this.editTodo(todoData);
  }
  changeTogglePopUp(status) {
    this.setState({
      togglePopUp: status
    });
  }
  getTodoId(id){
    this.setState({
      editTodoId: id
    })
    
  }
  handleEdit(event) {
    event.preventDefault();
    this.getTodoId(event.target.dataset.key);
    this.getData(event.target.value);
    this.setState({ togglePopUp: true });
  }
  handleUpdate(event) {
    event.preventDefault();
    let formatData = {
      "description": this.state.editTodo
    }
    ApiServices.updateTodo('users/3/todo/', this.state.editTodoId, formatData)
      .then(() => ApiServices.fetchPages('users/3/todo').then(todoList => {
        this.onUpdateTodo(todoList);
        this.changeTogglePopUp(false);
      }));

  }
  render() {
    return (
      <div>
        <div className="header">Todo-lists
        <button type="submit" className="button btn-danger"
         onClick={this.handleLogout}>Logout</button>
        </div>
        <Search handleSearch={this.handleSearch}/>
        <Create handleSubmit = {this.handleSubmit} 
        value ={this.state.description}
         handleInputChange = {this.handleInputChange}
          onUpdateTodo={todoList => {
          this.setState(function () {
              return {todoList: todoList}
            })
        }}/>
     
        <div className="todoCount">
        Todo count:<span className="badge">{this.state.todoList.length}</span>
        </div>
        <TodoList 
         handleEdit={this.handleEdit}
          editTodo={this.editTodo} handleDelete={this.handleDelete}
          todoList={this.state.todoList} getData = {this.getData}
          onDeleteTodo={this.onDeleteTodo}
           />
        <UpdateBox prevData={this.state.editTodo}
          handleInputChangeOfUpdate={this.handleInputChangeOfUpdate}
          todoId={this.state.editTodoId}
          handleUpdate={this.handleUpdate}
          isDisplay={this.state.togglePopUp ? "displayOn" : "displayOff"}
          changeTogglePopUp={this.changeTogglePopUp}
          onUpdateTodo={todoList => {
            this.props.onUpdateTodo(todoList);
          }}
        />
      </div>
    )
  }
}

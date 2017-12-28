/**Global imports */
import React from 'react';
import {Component} from 'react';

/**Local imports */
import './Todo.css';
import Create from './Create';
import Search from './Search';
import TodoList from './TodoList';
import UpdateBox from './UpdateBox';
import { Link } from 'react-router-dom';
import * as ApiServices from '../services/api';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      description: '',
      editTodo: '',
      editTodoId:null,
      searchbar: '',
      tags:[],
      tagsList:[],
      togglePopUp: false
    };
  }

  getData = (todoData) => this.editTodo(todoData);
  getTodoId = (id)=> this.setState({ editTodoId: id});
  handleLogout = (event) => ApiServices.logout('logout');
  editTodo = (todoData) => this.setState({editTodo: todoData});
  onUpdateTodo = (todoList) =>this.setState({todoList:todoList});
  onDeleteTodo = (todoList) => this.setState({todoList: todoList});
  changeTogglePopUp = (status) => this.setState({togglePopUp: status});
  handleUpdateChange= (event) => this.setState({description: event.target.value});
  handleInputChange = (event) => this.setState({ description: event.target.value });
  handleInputChangeOfUpdate = (event) => this.setState({ editTodo: event.target.value});

  handleSubmit = (event) => {
    event.preventDefault();
    ApiServices.addTodo('users/3/todo', this.state)
      .then(() => ApiServices.fetchPages('users/3/todo')
        .then(todoList => {
          this.onUpdateTodo(todoList)
        }));
       
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.setState({ searchbar: event.target.value })
    ApiServices.searchTodo('users/3/todo', event.target.value).then(result => this.setState( {todoList:result}) )
  }

  handleDelete = (event) => {
    event.preventDefault();
    ApiServices.deleteTodo('users/3/todo/', event.target.value)
      .then(() => ApiServices.fetchPages('users/3/todo')
        .then(todoList => {
          this.onDeleteTodo(todoList)
        }));
  }

  handleEdit = (event)=> {
    event.preventDefault();
    this.getTodoId(event.target.dataset.key);
    this.getData(event.target.value);
    this.setState({ togglePopUp: true });
  }

  handleUpdate = (event) => {
    event.preventDefault();
    const formatData = {
      description: this.state.editTodo
    }
    ApiServices.updateTodo('users/3/todo/', this.state.editTodoId, formatData)
      .then(() => ApiServices.fetchPages('users/3/todo').then(todoList => {
        this.onUpdateTodo(todoList);
        this.changeTogglePopUp(false);
      }));
  }
 
  componentDidMount() {
    ApiServices.fetchPages('users/3/todo').then(todoList => {
      this.setState(function () {
        return { todoList: todoList }
      })
    })
    ApiServices.fetchTags('/tags').then(tags =>
      this.setState(function () {
        return { tagsList: tags }
      })
    )
  }
  checkboxChange = (event) => {
    const tags = this.state.tags;
    let index;
    if(event.target.checked){
      tags.push(+event.target.value); //+ is to convert into integer
    }else{
      index = tags.indexOf(+event.target.value);
      tags.splice(index,1);
    }
    this.setState({tags:tags})
  }

  render() {
    return (
      <div>
        
        <div className="header">Todo-lists
        <Link to= "/logout" className="button btn-danger" onClick={this.handleLogout}>Logout
         </Link>
        </div>
        <Search handleSearch={this.handleSearch}/>
        <Create handleSubmit={this.handleSubmit} fetchTags={this.state.tagsList} checkboxChange={this.checkboxChange}
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

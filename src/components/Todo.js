import React, { Component } from 'react';
import { fetchPages } from '../utils/api';
import { deleteTodo } from '../utils/api';
import Create from './Create';

function User(props) {
  return <h1>Posted By:{props.user.firstName 
    +' '+props.user.lastName}</h1>
}
function Description(props) {
  return <article>{props.description}</article>
}
function Date(props) {
  return <p>{props.date}</p>
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      deleteTodo:''
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    //AJAX
    fetchPages('users/3/todo')
      .then(todoList => {
        this.setState(function () {
          return {
            todoList: todoList
          }
        })
      });
  }
  handleDelete(event){
    event.preventDefault();
    let todoId = event.target.value;
    deleteTodo('users/3/todo/', todoId).then(
      () => fetchPages('users/3/todo')
    );
  }
 
  render() {
    return (
      
      <div className="todo-lists">
        <Create onUpdateTodo={todoList => {
          this.setState(function () {
            return {
              todoList: todoList
            }
          })
        }}/>
        <p>Todo count:{this.state.todoList.length}</p>
        {this.state.todoList.map((data, index) => (
          <div>
            <User user={data.user} key={data.user.id}/>
            <Description description={data.description} key={data.id}/>
            <Date date={data.createdAt} />
            <button value={data.id} onClick={this.handleDelete}>Delete Todo</button>
            <b>Tags:</b>
            {data.tags.map((tag, index) => (
              <p>{tag.tagName}</p>
            ))}
          </div>
        ))}
        
      
        
      </div>
    )
  }
}

export default Todo;
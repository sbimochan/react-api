import React, { Component } from 'react';
import { fetchPages } from '../utils/api';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }
  }
  componentDidMount() {
    //AJAX
    fetchPages('users/3/todo')
      .then(todoList => {
        // console.log(res);
        // return this.state =res;
        this.setState(function () {
          return {
            todoList: todoList
          }
        })
      });
  }
  render() {
    return (
      <div className="todo-lists">
        {this.state.todoList.map((data, index) => (
          <div>
            <h1>Posted By: {data.user.firstName}</h1>
            <article>{data.description}</article>
            <p>{data.createdAt}</p>
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
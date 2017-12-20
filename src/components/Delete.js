import React, {Component} from 'react';
import {deleteTodo, fetchPages} from '../services/api'

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteTodo: ''
    }
    this.handleDelete = this
      .handleDelete
      .bind(this);
  }
  handleDelete(event) {
    event.preventDefault();
    let todoId = event.target.value;
    deleteTodo('users/3/todo/', todoId)
    .then(() => fetchPages('users/3/todo')
    .then(todoList => {
      this
        .props
        .onDeleteTodo(todoList)
    }));
  }

  render() {
    return (
      <button className="button btn-danger"value={this.props.data} onClick={this.handleDelete}>Delete Todo</button>
    );
  }
}

export default Delete;
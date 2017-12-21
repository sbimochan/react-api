/**Global imports */
import React from 'react';
import {Component} from 'react';

/**Local imports */
import { fetchPages, updateTodo } from '../services/api';

export default class UpdateBox extends Component {
  constructor(props) {
    super(props);
    this.state={
      "description": props.prevData,
      
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

  }
  handleInputChange(event) {
    this.setState({ 
      "description": event.target.value
     })
  }
  handleUpdate(event) {
    event.preventDefault();
    let formatData = {
      "description": this.state.description
    }
    updateTodo('users/3/todo/', this.props.todoId, formatData)
      .then(() => fetchPages('users/3/todo').then(todoList => {
        this.props.onUpdateTodo(todoList);
        this.props.changeTogglePopUp(false);
      }));
  }

  render() {
    return (
      <div className={this.props.isDisplay}>
        <div><h2>Update todo</h2></div>
        <form onSubmit={this.handleUpdate}>
          <div>Todo:<input id="searchInputBox"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}/></div>
          </form>
          </div>
    );
  }
}
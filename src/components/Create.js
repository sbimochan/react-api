import React, { Component } from 'react';
import { addTodo } from '../utils/api';
import { fetchPages } from '../utils/api';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "description": ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    addTodo('users/3/todo', this.state).then(() => fetchPages('users/3/todo')
      .then(todoList => {
        this.props.onUpdateTodo(todoList)
      })

    );
  }

  render() {
    return (
      <div>
        <h1>Create todo</h1>
        <form onSubmit={this.handleSubmit}>
          Todo:<input type="text" name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="shoot" />
        </form>
      </div>
    );
  }
}

export default Create;
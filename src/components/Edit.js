/**Global imports */
import React from 'react';
import { Component } from 'react';

/**Local imports */
import './Todo.css';
import UpdateBox from './UpdateBox';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      togglePopUp: false
    };
    this.changeTogglePopUp = this.changeTogglePopUp.bind(this);
  }

  changeTogglePopUp(status) {
    this.setState({
      togglePopUp: status
    });
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.getData(this.props.data.id);
    this.setState({ togglePopUp: true });

  }
  render() {
    return (
      <div class="editButton">
        <UpdateBox prevData={this.props.data.description}
          todoId={this.props.data.id}
          isDisplay={this.state.togglePopUp ? "displayOn" : "displayOff"}
          changeTogglePopUp={this.changeTogglePopUp}
          onUpdateTodo={todoList => {
            this.props.onUpdateTodo(todoList);
          }}
        />
        <button className="button btn-warning" value={this.props.data.id} onClick={this.handleEdit} > Edit Todo </button>
      </div>
    );
  }
}
/**Global imports */
import React from 'react';
import {Component} from 'react';

/**Local imports */
import './Todo.css';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(event) {
    event.preventDefault();
    this
      .props
      .getData(this.props.data.id);

    document
      .getElementById('todoEditBox')
      .style
      .display = "block";
    document
      .getElementById('todoBox')
      .value = this.props.data.description;
  }
  render() {
    return (
      <button className="button btn-warning"value={this.props.data.id} onClick={this.handleEdit}>Edit Todo</button>
    );
  }
}

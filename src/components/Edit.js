import React, {Component} from 'react';
import './Todo.css';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this
      .handleEdit
      .bind(this);
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

export default Edit;
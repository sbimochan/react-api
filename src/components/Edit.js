import React, {Component} from 'react';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "description": '',
      todoId: null
    }
    this.handleEdit = this
      .handleEdit
      .bind(this);
  }
  handleEdit(event) {
    event.preventDefault();
    this
      .props
      .getData(this.props.data.id);
    this.setState({todoId: event.target.value, "description": this.props.desc})
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
      <button value={this.props.data.id} onClick={this.handleEdit}>Edit Todo</button>
    );
  }
}

export default Edit;
import React, {Component} from 'react';

class UpdateBox extends Component {

  render() {
    return (
      <div id="todoEditBox">
        <h1>Update todo</h1>
        <form onSubmit={this.handleSubmit}>
          <div>Todo:<input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}/></div>
        </form>
      </div>
    )
  }
}
export default UpdateBox;
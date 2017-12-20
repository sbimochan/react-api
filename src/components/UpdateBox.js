/**Global imports */
import React from 'react';
import {Component} from 'react';

export default UpdateBox = props => (
  <div id="todoEditBox">
    <h1>Update todo</h1>
    < form onSubmit={this.handleSubmit}>
      <div>Todo:<input
        type="text"
        name="description"
        value={this.state.description}
        onChange={this.handleInputChange}/></div>
    </form>
  </div>
)

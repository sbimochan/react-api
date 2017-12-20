/**Global imports */
import React from 'react';
import {Component} from 'react';

/**Local imports */
import './Todo.css';
import {searchTodo} from '../services/api';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "searchbar": ''
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleSearch(event) {
    event.preventDefault();
    // console.log(event.target.value);
    let value = event.target.value
    this.setState({"searchbar": value})
    searchTodo('users/3/todo', event.target.value).then(result => this.props.onSearchTodo(result))
  }

  render() {

    return (
      <div className="searchBar">
        <label>Search todo
        </label>
        <input
          id="searchInputBox"
          type="text"
          name="searchbar"
          onChange={this.handleSearch}
          placeholder="search todo"/>
      </div>
    );
  }
}

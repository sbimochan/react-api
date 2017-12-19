import React, {Component} from 'react';
import {searchTodo} from '../utils/api';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "searchbar": ''
    }
    this.handleSearch = this
      .handleSearch
      .bind(this);
  }
  handleSearch(event) {
    event.preventDefault();
    // console.log(event.target.value);
    let value = event.target.value
    this.setState({"searchbar": value})
    searchTodo('users/3/todo', event.target.value).then(result => {
      this
        .props
        .onSearchTodo(result)
    })
  }

  render() {

    return (
      <div>
        <label for="searchbar">Search todo
        </label>
        <input
          type="text"
          name="searchbar"
          onChange={this.handleSearch}
          placeholder="search todo"/>
      </div>
    );
  }
}

export default Search;
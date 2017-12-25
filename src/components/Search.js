/**Global imports */
import React from 'react';

const Search = props => {
  return (
    <div className="searchBar">
      <label>Search todo
        </label>
      <input
        id="searchInputBox"
        type="text"
        name="searchbar"
        onChange={props.handleSearch}
        placeholder="search todo" />
    </div>
  );
}
export default Search;
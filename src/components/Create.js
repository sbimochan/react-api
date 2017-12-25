/**Global imports */
import React from 'react';
import {Component} from 'react';

const Create = props =>{
  return (
    <div className="createForm">

      <h1>Create todo</h1>
      <form onSubmit={props.handleSubmit}>
        <div>Todo:<textarea
          rows="8"
          type="text"
          id="searchInputBox"
          name="description"
          value={props.description}
          onChange={props.handleInputChange} /></div>

        <div className="tags">
          <input type="checkbox" name="tagsCheckbox" id="1" />
          <label>person</label>
          <input type="checkbox" name="tagsCheckbox" id="2" />
          <label>nature</label>
          <input type="checkbox" name="tagsCheckbox" id="3" />
          <label>vehicle</label>
          <input type="checkbox" name="tagsCheckbox" id="4" />
          <label>building</label>
        </div>
        <input type="submit" className="button" value="shoot" />
      </form>
    </div>
  );
}
export default Create;
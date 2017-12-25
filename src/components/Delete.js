/**Global imports */
import React from 'react';
import {Component} from 'react';

const Delete = props =>{
  return (
    <button className="button btn-danger" 
    value={props.data}
     onClick={props.handleDelete}>Delete Todo</button>
  );
}
export default Delete;
/**Global imports */
import React from 'react';

const Delete = props =>{
  return (
    <div className="button btn-danger" 
    value={props.data}
     onClick={props.handleDelete}>Delete Todo</div>
  );
}
export default Delete;
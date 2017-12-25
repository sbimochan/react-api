/**Global imports */
import React from 'react';

export const UpdateBox =props =>{
  return (
    <div className={props.isDisplay}>
      <div><h2>Update todo</h2></div>
      <form onSubmit={props.handleUpdate}>
        <div>Todo:<input id="searchInputBox"
          type="text"
          name="description"
          value={props.prevData}
          onChange={props.handleInputChangeOfUpdate} /></div>
      </form>
    </div>
  );
}
export default UpdateBox;
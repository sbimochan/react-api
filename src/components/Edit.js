/**Global imports */
import React from 'react';

 const Edit = props=>{
   return (
     <div className="editButton">
       <button className="button btn-warning" data-key={props.data.id} value={props.data.description} onClick={props.handleEdit} > Edit Todo </button>
     </div>
   );
 } 
 export default Edit;
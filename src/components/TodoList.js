/**Global imports */
import React from 'react';
/* Local imports */
import './Todo.css';
import Edit from './Edit'
import Delete from './Delete';

function User(props) {
  return <div> <em>Posted By:{props.user.firstName + ' ' + props.user.lastName}</em></div>
}

function Description(props) {
  return <article>{props.description}</article>
}

function Date(props) {
  return <p>{props.date}</p>
}

const TodoList= props =>{
  return (
    <div >
      {props.todoList.map((data, index) => (
        <div key={data.id} className="todoFrame">
          <Description description={data.description} key={data.id} />
          <Date date={data.createdAt} />
          <User user={data.user} key={data.user.id} />
          <div className="actions">
          <Delete data={data.id} index={index} handleDelete={props.handleDelete} /> 
          <Edit data={data} handleEdit={props.handleEdit} />
          </div>
          <ul className="tagsList">
          {data.tags.map((tag, index) => (
            <li className="tag" key={index} value={tag.id} onClick={props.tagLink}>{tag.tagName}</li>
          ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
export default TodoList;
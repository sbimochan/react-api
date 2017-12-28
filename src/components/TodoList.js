/**Global imports */
import React from 'react';
/* Local imports */
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
          <Delete
            data={data.id} handleDelete={props.handleDelete}
            onDeleteTodo={todoList => {
            props.onDeleteTodo(todoList);
            }} /> 
           
          <Edit data={data} currentTodo={data.description} handleEdit={props.handleEdit} />
          <br />

          <b>Tags:</b>
          {data.tags.map((tag, index) => (
            <a href="/tags" key={index}>{tag.tagName + ', '}</a>
          ))}
        </div>
      ))}
    </div>
  )
}
export default TodoList;
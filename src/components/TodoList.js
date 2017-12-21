/**Global imports */
import React from 'react';
import {Component} from 'react';

/**Local imports */
import './Todo.css';
import Edit from './Edit';
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
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }
  
  getData(id) {
    this.props.editTodo(id);
  }

  render() {
    return (
      <div >
        {this.props.todoList.map((data, index) => (
            <div  key={data.id} className="todoFrame">
              <Description description={data.description} key={data.id}/>
              <Date date={data.createdAt}/>
              <User user={data.user} key={data.user.id}/>
              <Delete
                data={data.id}
                onDeleteTodo={todoList => {
                this.props.onDeleteTodo(todoList);
              }}/>
              <Edit data={data} desc={data.description} getData={this.getData}
                onUpdateTodo={todoList =>{
                  this.props.onUpdateTodo(todoList);
                }}/>
              <br/>
              <b>Tags:</b>
              {data.tags.map((tag, index) => (
                  <a href="#" key={index}>{tag.tagName+', '}</a>
                ))}
            </div>
          ))}
      </div>
    )
  }
}
import React, {Component} from 'react';
import Delete from './Delete';
import Edit from './Edit';

function User(props) {
  return <h1>Posted By:{props.user.firstName + ' ' + props.user.lastName}</h1>
}
function Description(props) {
  return <article>{props.description}</article>
}
function Date(props) {
  return <p>{props.date}</p>
}
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.getData = this
      .getData
      .bind(this);
  }
  getData(id) {
    this
      .props
      .editTodo(id);
  }

  render() {
    return (
      <div>
        {this
          .props
          .todoList
          .map((data, index) => (
            <div>
              <User user={data.user} key={data.user.id}/>
              <Description description={data.description} key={data.id}/>
              <Date date={data.createdAt}/>
              <Delete
                data={data.id}
                onDeleteTodo={todoList => {
                console.log('delete', todoList);
                this
                  .props
                  .onDeleteTodo(todoList);
              }}/>
              <Edit data={data} desc={data.description} getData={this.getData}/>
              <br/>
              <b>Tags:</b>
              {data
                .tags
                .map((tag, index) => (
                  <p>{tag.tagName}</p>
                ))}
            </div>
          ))}
      </div>
    )
  }
}
export default TodoList;
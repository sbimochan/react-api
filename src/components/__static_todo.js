import React, {Component} from 'react';

function User(props) {
  return <h1>Posted By:{props.user.firstName}</h1>
}
function Description(props) {
  return <article>{props.description}</article>
}
function Date(props) {
  return <p>{props.date}</p>
}
class Todo extends Component {
  todo = {
    "data": [
      {
        "id": 31,
        "description": "Read React",
        "userId": 3,
        "createdAt": "2017-12-16T10:01:11.696Z",
        "user": {
          "id": 3,
          "createdAt": "2017-12-15T17:58:29.862Z",
          "updatedAt": "2017-12-15T17:58:29.862Z",
          "firstName": "bimochan",
          "lastName": "shrestha",
          "email": "bmochan@gmail.com",
          "username": "sbimochan",
          "password": "123456"
        },
        "tags": [
          {
            "id": 2,
            "tagName": "nature",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 31,
            "_pivot_tag_id": 2
          }, {
            "id": 4,
            "tagName": "building",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 31,
            "_pivot_tag_id": 4
          }
        ]
      }, {
        "id": 32,
        "description": "study college books",
        "userId": 3,
        "createdAt": "2017-12-16T10:01:42.075Z",
        "user": {
          "id": 3,
          "createdAt": "2017-12-15T17:58:29.862Z",
          "updatedAt": "2017-12-15T17:58:29.862Z",
          "firstName": "bimochan",
          "lastName": "shrestha",
          "email": "bmochan@gmail.com",
          "username": "sbimochan",
          "password": "123456"
        },
        "tags": [
          {
            "id": 7,
            "tagName": "gadgets",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 32,
            "_pivot_tag_id": 7
          }, {
            "id": 1,
            "tagName": "person",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 32,
            "_pivot_tag_id": 1
          }, {
            "id": 2,
            "tagName": "nature",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 32,
            "_pivot_tag_id": 2
          }, {
            "id": 3,
            "tagName": "vehicle",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 32,
            "_pivot_tag_id": 3
          }
        ]
      }, {
        "id": 33,
        "description": "chill",
        "userId": 3,
        "createdAt": "2017-12-16T10:01:55.804Z",
        "user": {
          "id": 3,
          "createdAt": "2017-12-15T17:58:29.862Z",
          "updatedAt": "2017-12-15T17:58:29.862Z",
          "firstName": "bimochan",
          "lastName": "shrestha",
          "email": "bmochan@gmail.com",
          "username": "sbimochan",
          "password": "123456"
        },
        "tags": [
          {
            "id": 4,
            "tagName": "building",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 33,
            "_pivot_tag_id": 4
          }, {
            "id": 1,
            "tagName": "person",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 33,
            "_pivot_tag_id": 1
          }, {
            "id": 5,
            "tagName": "food",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 33,
            "_pivot_tag_id": 5
          }, {
            "id": 6,
            "tagName": "all",
            "createdAt": "2017-12-14T05:26:29.653Z",
            "_pivot_todoList_id": 33,
            "_pivot_tag_id": 6
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "rowCount": 3,
      "pageCount": 1
    }
  };

  render() {
    return (
      <div className="todo-lists">

        {this
          .todo
          .data
          .map((data, index) => (
            <div>
              <User user={data.user}/>
              <Description description={data.description}/>
              <Date date={data.createdAt}/>
              <b>Tags:</b>
              {data
                .tags
                .map((tag, index) => (
                  <p>{tag.tagName}</p>
                ))}
              {/* <Tags tags={data.tags}/> */}
            </div>
          ))}
      </div>
    )
  }
}

export default Todo;
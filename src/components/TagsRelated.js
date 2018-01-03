import React from 'react';

const TagsRelated = props =>{
  return (
    <div>
      <div className="tagsRelated">
      {props.data.map((data,index)=>(
        <div key={data.id} className="todoFrame">
          <article>{data.description}</article>
          <p>Created at: {data.createdAt}</p>
        </div>
      ))}
      </div>
    </div>
  )
}
export default TagsRelated;
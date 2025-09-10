import React from 'react';

const List = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0) return <p>No orders, sorry</p>;
  return (
    <ul>
      <h2 className='list-head'>Order List</h2>
      {repos.map((repo) => {
        return (
          <li key={repo.id} className='list'>
            <span className='repo-text'>{repo.name} </span>
             <span className='repo-text'>Item Description: </span><span className='repo-description'> {repo.description}</span>
             <span className='repo-text'>Quantity:  </span><span className='repo-description'>{repo.quantity}</span>
             <span className='repo-text'>Category: </span><span className='repo-description'>{repo.itemCategory}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default List;

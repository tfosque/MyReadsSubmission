import React from 'react';
import './BookStore.css';

export default function Bar(props) {
  const { shelf } = props;

  return <div className='bar'>{shelf}</div>;
}

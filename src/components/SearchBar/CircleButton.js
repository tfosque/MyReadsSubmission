import React from 'react';
import { Link } from 'react-router-dom';

import './CircleButton.css';

export function CircleButton(props) {
  return (
    <div>
      <Link to='/search'>
        <button type='button' className='btn btn-success btn-circle btn-xl'>
          <b style={{ fontSize: 60, marginTop: -21, display: 'block' }}>+</b>
        </button>
      </Link>
    </div>
  );
}

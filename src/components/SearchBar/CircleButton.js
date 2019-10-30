import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import './CircleButton.css';

export function CircleButton(props) {
  return (
    <div>
      <Link to='/search'>
        <button type='button' className='btn btn-success btn-circle btn-xl'>
          <AddIcon />
        </button>
      </Link>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import AddIcon from '../../images/icon-add.svg.png';

export function CircleButton(props) {
  return (
    <div>
      <Link to='/search'>
        <Image src={AddIcon} />
      </Link>
    </div>
  );
}

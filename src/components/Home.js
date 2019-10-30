import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Home() {
  const logoStyle = {
    backgroundImage: `url('https://www.logolynx.com/images/logolynx/9d/9df13ecfc79980e6a1e245e9154f9942.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0px 60px',
    width: 430,
    height: 200,
    margin: 'auto',
  };

  return (
    <Container fluid>
      <div style={{ textAlign: 'center', marginTop: 300 }}>
        <h2>
          <Link style={{ color: '#292929' }} to='/books'>
            <b>Bookshelf Project</b>
            <div>
              <small>Udacity MyReads</small>
            </div>
            <div style={logoStyle} />
          </Link>
        </h2>
      </div>
    </Container>
  );
}

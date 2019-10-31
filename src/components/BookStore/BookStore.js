import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { createBrowserHistory } from 'history';

import * as BooksAPI from '../../BooksAPI';
import { Button } from 'react-bootstrap';

import { CircleButton } from '../SearchBar/CircleButton';
import Shelf from './Shelf';

import './BookStore.css';

class BookStore extends Component {
  state = {
    bookData: [],
    searchMode: false,
    shelves: {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read'],
    },
  };

  componentDidMount() {
    this.refreshBooks();
  }

  turnOffSearchStyles = () => {
    this.setState({
      searchMode: false,
    });
    this.refreshBooks();
  };

  refreshBooks = (id) => {
    createBrowserHistory().push('/books', this.state);

    setTimeout(() => {
      BooksAPI.getAll().then((resp) =>
        this.setState({ bookData: resp, searchMode: false }),
      );
    }, 500);
  };

  render() {
    const { bookData, searchMode } = this.state;

    const NoResults = (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 300,
          }}
        >
          <div style={{ color: '#fff' }}>
            Sorry your search did not return any results.
          </div>
          <div style={{ margin: 15 }}>
            <Button onClick={this.refreshBooks}>Home</Button>
          </div>
        </div>
      </div>
    );

    if (isEmpty(bookData) && searchMode) {
      return NoResults;
    }

    const Shelves = () => {
      return !isEmpty(bookData)
        ? Object.entries(this.state.shelves).map((shelf) => (
            <Shelf
              key={shelf}
              shelf={shelf}
              books={bookData}
              Œ
              refreshBooks={(id) => this.refreshBooks(id)}
              searchMode={searchMode}
            />
          ))
        : null;
    };

    return (
      <div>
        <h1
          style={{
            textAlign: 'center',
            backgroundColor: 'rgb(40, 167, 69)',
            color: '#fff',
            marginBottom: 0,
            padding: '5px 10px',
          }}
        >
          My Reads
        </h1>
        {isEmpty(bookData) ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 300,
            }}
          >
            <div className='spinner-border text-warning' role='status'>
              <span className='sr-only'></span>
            </div>
            <div style={{ color: '#fff' }}>&nbsp; searching books...</div>
          </div>
        ) : (
          <div>
            <div style={{ margin: '30px 350px' }}>
              <Shelves />
              <div className='circleButtonContainer'>
                <CircleButton />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(BookStore);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { createBrowserHistory } from 'history';

import * as BooksAPI from '../../BooksAPI';
import { Button } from 'react-bootstrap';

import { CircleButton } from '../SearchBar/CircleButton';
import Shelf from './Shelf';

class BookStore extends Component {
  state = {
    bookData: [],
    searchMode: false,
    showHide: false,
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

  refreshBooks = () => {
    createBrowserHistory().push('/books', this.state);

    setTimeout(() => {
      BooksAPI.getAll().then((resp) =>
        this.setState({ bookData: resp, searchMode: false }),
      );
    }, 500);
  };

  render() {
    const { bookData, searchMode } = this.state;

    const currentlyReading = bookData.filter(
      (book) => book.shelf === 'currentlyReading',
    );
    const wantToRead = bookData.filter((book) => book.shelf === 'wantToRead');
    const read = bookData.filter((book) => book.shelf === 'read');

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
              <div>
                <Shelf
                  shelf='Currently Reading'
                  books={currentlyReading}
                  refreshBooks={this.refreshBooks}
                  searchMode={searchMode}
                />
                <Shelf
                  shelf='Want To Read'
                  books={wantToRead}
                  refreshBooks={this.refreshBooks}
                  searchMode={searchMode}
                />
                <Shelf
                  shelf='Read'
                  books={read}
                  refreshBooks={this.refreshBooks}
                  searchMode={searchMode}
                />
              </div>

              <div
                style={{
                  position: 'relative',
                  top: -620,
                  left: 350,
                  zIndex: 1000,
                  float: 'right',
                  margin: '90px 155px',
                }}
              >
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

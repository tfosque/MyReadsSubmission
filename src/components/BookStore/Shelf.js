import React, { Component } from 'react';
import PropType from 'prop-types';
import { isEmpty, size, sortBy } from 'lodash';

import Bar from './Bar';
import Book from '../Book/Book';

import './BookStore.css';

const proptypes = {
  books: PropType.array.isRequired,
};

export default class Shelf extends Component {
  render() {
    const { books, shelf, refreshBooks } = this.props;

    const Books = () => {
      return (
        <div className='booksContainer'>
          {!isEmpty(books)
            ? sortBy(books, 'title').map((book) => {
                return (
                  <div
                    key={`${book.thumbnail}${book.pageCount}${book.title}`}
                    {...(true ? { timeout: 500 } : {})}
                  >
                    <div>
                      <Book
                        searchMode={this.props.searchMode}
                        book={book}
                        shelfLabel={label}
                        refreshBooks={() => refreshBooks()}
                        turnOffSearchStyles={() =>
                          this.props.turnOffSearchStyles
                        }
                      />
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      );
    };

    const label = size(books) > 0 ? books[0].shelf : null;

    return (
      <div className='shelfContainer'>
        <Books />
        <Bar shelf={shelf} />
      </div>
    );
  }
}

Shelf.propTypes = proptypes;

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
    const { shelf, books, refreshBooks } = this.props;

    const bookshelf =  books.filter(f => f.shelf.includes(shelf[0]));

    const shelfTitle = shelf[1][0];

    const Books = () => {
      return (
        <div className='booksContainer'>
          {!isEmpty(bookshelf)
            ? sortBy(bookshelf, 'title').map((book) => {
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
                        refreshBooks={(id) => refreshBooks(id)}
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
        <Bar shelf={shelfTitle} />
      </div>
    );
  }
}

Shelf.propTypes = proptypes;

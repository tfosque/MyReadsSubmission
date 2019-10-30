import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchBar/SearchResults';
import * as BooksAPI from '../../BooksAPI';
import { createBrowserHistory } from 'history';

class SearchPage extends Component {
  state = {
    booksToSearch: [],
    searchMode: true,
  };

  loadBooksFromSearch = (res) => {
    this.setState({
      booksToSearch: res,
    });
  };

  refreshBooks = () => {
    createBrowserHistory().push('/books', this.state);

    setTimeout(() => {
      BooksAPI.getAll().then((resp) =>
        this.setState({ bookData: resp, searchMode: false }), //booksToSearch
      );
    }, 1200);
  };

  render () {
    return (
      <div>
        <SearchBar
          loadBooksFromSearch={(res) => this.loadBooksFromSearch(res)}
          turnOffSearchStyles={() => this.props.turnOffSearchStyles()}
          searchResults={this.state.booksToSearch}
        />
        <SearchResults
          searchResults={this.state.booksToSearch}
          refreshBooks={this.refreshBooks}
          loadBooksFromSearch={(res) => this.loadBooksFromSearch(res)}
        />
      </div>
    );
  }
}

export default SearchPage;

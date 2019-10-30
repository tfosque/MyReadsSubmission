import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { isEmpty, size } from 'lodash';
import { animations, easings } from 'react-animation'
import * as BooksAPI from '../../BooksAPI';
import NoCover from '../../images/cover-NA.jpg';

import './Book.css';

class Book extends Component {
  _isMounted = false;

  state = {
    active: true,
    defaultValue: 'none',
  };

  componentDidMount(){
    this._isMounted = true;

    const api = "https://reactnd-books-api.udacity.com"

    let token = localStorage.token
    if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)

    const headers = {
      'Accept': 'application/json',
      'Authorization': token
    }

    axios
      .get(`${api}/books/${this.props.book.id}`, { headers })
      .then((json) => json)
      .then(result => {
         if(this._isMounted) {
          this.setState({
            // book: result.data,
            defaultValue: result.data.book.shelf,
          })
        }
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // change from bookstore
  handleChange = (e) => {
    const { book, refreshBooks } = this.props;
    const shelf = e.target.value;

    if (shelf === 'currentlyReading') {
      BooksAPI.update({ id: book.id }, shelf).then(() => refreshBooks(book.id));
    } else if (shelf === 'wantToRead') {
      BooksAPI.update({ id: book.id }, shelf).then(() => refreshBooks(book.id));
    } else if (shelf === 'read') {
      BooksAPI.update({ id: book.id }, shelf).then(() => refreshBooks(book.id));
    } else if (shelf === 'none') {
      BooksAPI.update({ id: book.id }, shelf).then(() => refreshBooks(book.id));
    }
  };

  // change from search
  handleChangeSearch = (e) => {
    const { book } = this.props;
    const shelf = e.target.value;

    if (shelf === 'currentlyReading') {
      console.log(e.target.value);
      BooksAPI.update({ id: book.id }, shelf);
    } else if (shelf === 'wantToRead') {
      BooksAPI.update({ id: book.id }, shelf);
    } else if (shelf === 'read') {
      BooksAPI.update({ id: book.id }, shelf);
    } else if (shelf === 'none') {
      BooksAPI.update({ id: book.id }, shelf);
    }
  };

  render() {
    const { book } = this.props;
    const { imageLinks, title, authors } = book;

    const style = {
      animation: `pop-in ${easings.easeOutCubic} 600ms forwards`,
    }

    const bookStyle = {
      width: 128,
      height: 231,
      margin: '0px 26px 76px 22px',
      marginTop: 0,
      display: 'block',
    };

    const truncateTitle = (str) => {
      if (size(str) > 24) {
        return `${str.substring(0, 21)}...`;
      }
      return str;
    };

    const bookStyleSearch = {
      border: 'inset thick red',
      margin: '0px 80px',
      marginTop: 0,
      display: 'block',
    };

    const applyBookSearchStyle = this.props.searchMode
      ? bookStyleSearch
      : bookStyle;

    const authorList = !isEmpty(authors)
      ? authors.map((author) => `${author},`)
      : 'Author not available';

    const thumb = !isEmpty(imageLinks) ? imageLinks.thumbnail : NoCover;

    const getRoute = this.props.history.location.pathname;

    const setChangeMethod =
      getRoute === '/search' ? this.handleChangeSearch : this.handleChange;

    const DisplayImage = () => {
      return (
        !isEmpty(imageLinks) ? (
          <div
            className='book-cover'
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${thumb})`,
            }}
          />
          ) : (
            <div
              className='book-cover'
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${thumb})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          ))
    }

    const BOOK = () => {
      return (
        <div>
          <div>
            <div className='book' style={applyBookSearchStyle}>
              <section style={style}>
              <div className='book-top'>
               <DisplayImage />
                <div className='book-shelf-changer'>
                  <select
                    onChange={setChangeMethod}
                    defaultValue={this.state.defaultValue}
                  >
                    <option value='move' disabled>
                      Move to...
                    </option>
                    <option value='currentlyReading'>Currently Reading</option>
                    <option value='wantToRead'>Want to Read</option>
                    <option value='read'>Read</option>
                    <option value='none'>None</option>
                  </select>
                </div>
              </div>

            </section>

              <div className='book-title'>{truncateTitle(title)}</div>
              <div className='book-authors'>{authorList}</div>
            </div>
          </div>
        </div>
      );
    };

    return <BOOK />;
  }
}

export default withRouter(Book);

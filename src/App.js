import React from 'react';
import Home from './components/Home';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import BookStore from './components/BookStore/BookStore';
import Search from './components/SearchPage/SearchPage';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
  };

  render() {
    return (
      <BrowserRouter base='/'>
        <div className='app'>
          <Route exact path='/' component={Home} />
          <Route exact path='/books' component={BookStore} />
          <Route exact path='/search' component={Search} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;

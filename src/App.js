import React from 'react';
import Home from './components/Home';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BookStore from './components/BookStore/BookStore';
import Search from './components/SearchPage/SearchPage';

class App extends React.Component {
  state = {
    showSearchPage: false,
  };

  render () {
    return (
      <BrowserRouter base='/'>
        <div className='app'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/books' component={BookStore} />
            <Route exact path='/search' component={Search} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

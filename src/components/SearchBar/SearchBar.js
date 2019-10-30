// TODO: rewrite readme 30 minutes
// TODO: testing.....

import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { InputGroup, FormControl, Form, Alert } from 'react-bootstrap';
import {size, isEmpty} from 'lodash';
import * as BooksAPI from '../../BooksAPI';
import HomeIcon from '@material-ui/icons/Home';

class SearchBar extends Component {
  state = {
    searchText: '',
    showAlert: false,
    key: null,
  };

  handleTextChange = (e) => {
    if (e.target.value.length <= 1) {
      return this.resetSearch();
    }

    if(e.key === 'Enter'){
      e.preventDefault();
      return false;
    }

    this.search();
  };

  handleOnChange = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  onFormKeyUp = (e) => {
    const hasContent = size(this.state.searchText) > 0

    if(e.key ===  'Backspace' && hasContent){
      this.search();
    }
    this.setState({ showAlert: size(this.props.searchResults) < 1 ? true : null})
  }

  onFormSubmit = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      return false;
    }
  };

  search = () => {
    BooksAPI.search(this.state.searchText, 20)
    .then(results => results)
      .then((results) => {
        try {
          if (results.error === 'empty query') {
            this.props.loadBooksFromSearch([]);
            return;
          }
          this.props.loadBooksFromSearch(results);
        } catch (error) {
            console.log('Book does not contain a shelf yet');
          }
      })
  };

  resetSearch = () => {
    this.setState({
      showAlert: false,
    });
    this.props.loadBooksFromSearch([]);
  };

  render() {
    const EmptyResults = () => {
      return size(this.props.searchResults) < 1 && this.state.showAlert && !isEmpty(this.state.searchText) ?
        (
          <h4 style={{ marginTop: -16, textAlign: 'center' }}>
            <Alert variant='warning'>
              'Sorry your search did not return any results. Continue typing to see more results or try again.'
            </Alert>
          </h4>
        ) : null;
      }

    return (
    <div>
    <Form
        name='searchForm'
        style={{ backgroundColor: '#fff' }}
        onSubmit={this.onFormKeyUp}
        onKeyUp={this.onFormKeyUp}
        onChange={this.handleOnChange}
      >
        <Form.Group as={'div'}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <Link to='/books'>
                  <HomeIcon />
                </Link>
              </InputGroup.Text>
            </InputGroup.Prepend>

            <FormControl
              placeholder='Search by title or author...'
              aria-label="Recipient's username"
              aria-describedby='basic-addon2'
              onKeyDown={this.handleTextChange}
              type='text'
              defaultValue={this.state.searchText}
              style={{ fontSize: '1.4em' }}
            />

            <InputGroup.Append>
              <InputGroup.Text
                id='basic-addon2'
                onClick={this.search}
                style={{ cursor: 'pointer' }}
              >
                Search
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      <EmptyResults />
    </div>
    );
  }
}

export default withRouter(SearchBar);

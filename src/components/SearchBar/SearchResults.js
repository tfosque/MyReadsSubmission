import React, { Component } from 'react';
import { Col, Row, Collapse } from 'react-bootstrap';
import { size, isEmpty } from 'lodash';

import Book from '../Book/Book';

class SearchResults extends Component {
  state = {
    open: false,
    searchResults: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchResults !== prevState.searchResults) {
      return {
        searchResults: nextProps.searchResults,
        open: size(nextProps.searchResults) > 0,
      };
    }
    return null;
  }

  render() {
    return (
      <Collapse in={this.state.open}>
        <Row style={{ margin: '30px 30px 30px 30px' }}>
          {!isEmpty(this.state.searchResults)
            ? this.state.searchResults.map((item) => (
                <Col
                  lg={1}
                  key={`${item}${Math.random(2) * 12}`}
                  style={{ marginBottom: 90 }}
                >
                  <Row>
                    <Book
                      key={`${item}${Math.random() * 3}`}
                      book={item}
                      loadBooksFromSearch={(res) =>
                        this.props.loadBooksFromSearch(res)
                      }
                    />
                  </Row>
                </Col>
              ))
            : null}
        </Row>
      </Collapse>
    );
  }
}

export default SearchResults;

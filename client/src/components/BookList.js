import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Spinner } from "./spinner/Spinner";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  state = {
    selected: null
  };

  render() {
    const { data } = this.props;
    const getBooks = data.loading ? (
      <Spinner />
    ) : (
      data.books.map(book => (
        <li
          key={book.id}
          onClick={e => {
            this.setState({ selected: book.id });
          }}
          className="cursor"
        >
          {book.name}
        </li>
      ))
    );
    return (
      <div>
        <ul id="book-list">{getBooks}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

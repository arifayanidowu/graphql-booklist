import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  render() {
    const { book } = this.props.data;
    const showDetails = book ? (
      <div>
        <h2>{book.name}</h2>
        <p className="grey-text">{book.genre}</p>
        <p className="grey-text">{book.author.name}</p>
        <p className="mt-3">All Books by this Author:</p>
        <ul className="other-books">
          {book.author.books &&
            book.author.books.map(list => (
              <li className="grey-text" key={list.id}>
                {list.name}
              </li>
            ))}
        </ul>
      </div>
    ) : (
      <div className="shadow-white">No Book Selected...</div>
    );

    return <div id="book-details">{showDetails}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.bookId
    }
  })
})(BookDetails);

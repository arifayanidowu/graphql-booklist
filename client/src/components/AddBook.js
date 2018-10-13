import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({
      name: "",
      genre: "",
      authorId: ""
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const data = this.props.getAuthorsQuery;
    const getAuthors = data.loading ? (
      <option disabled>loading...</option>
    ) : (
      data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
    return (
      <form id="add-book" className="m-3" onSubmit={this.onSubmit}>
        <div className="field">
          <label>Book Name</label>
          <input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            onChange={this.onChange}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label>Author</label>
          <select
            name="authorId"
            onChange={this.onChange}
            value={this.state.authorId}
          >
            <option value="Select Author">Select Author</option>
            {getAuthors}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

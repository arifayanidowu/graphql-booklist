import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider as Provider } from "react-apollo";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// set up apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <Provider client={client}>
        <div id="main">
          <h1 className="center fw-light">Book Library - Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </Provider>
    );
  }
}

export default App;

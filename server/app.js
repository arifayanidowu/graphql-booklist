const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const schema = require("./schema/schema");

// Init express
const app = express();

mongoose.connect(
  "mongodb://stizzle:bossman2@ds131313.mlab.com:31313/gql-react",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

const port = process.env.PORT || 4000;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

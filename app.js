const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

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

app.use(express.static(path.join(__dirname, "client/build")));

if(process.env.NODE_ENV === 'production'){
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable the GraphiQL interface for testing in the browser
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});

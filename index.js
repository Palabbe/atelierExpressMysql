const express = require('express');
const connection = require('./conf');
const app = express();
const port = process.env.PORT || 4040;
const morgan = require('morgan');

const homeRouter = require('./routes/home')
const booksRouter = require('./routes/books')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', homeRouter)
app.use('/books', booksRouter)

connection.connect((err) => {
    if (err) {
      console.error('error connecting to db');
    } else {
      console.log('connected to db');
    }
  });
  

app.listen(port, () => {
    console.log(`Server listening on port ${port} !`)
});
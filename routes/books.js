const express = require('express');
const router = express.Router();
const connection = require('../conf');

router.get('/', (req, res) => {
    let sql = `SELECT * FROM books`
    const sqlValues = [];
    if (req.query.max_price) {
      sql += ' WHERE price <= ?';
      sqlValues.push(req.query.max_price);
    }
    connection.query(sql, sqlValues, (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving products from db.');
      } else if (results.length === 0) {
        res.status(422).send('Book not found')
      } else {
        res.status(200).json(results);
      }
    });
   });

router.post('/', (req, res) => {
  const sql = `INSERT INTO books (title, author, price, pagination) VALUES (?, ?, ?, ?)`
  const { title, author, price, pagination } = req.body;
  connection.query(sql, [title, author, price, pagination],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the book');
      } else {
        res.status(201).send('Book successfully saved');
      }
    }
  );
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const userPropsToUpdate = req.body;
    const sql = `UPDATE books SET ? WHERE id = ?`
    connection.query(sql, [userPropsToUpdate, userId],
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error updating a book');
        } else {
          res.status(200).send('Book updated successfully 🎉');
        }
      }
    );
  });

  router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `DELETE FROM books WHERE id = ?`
    connection.query(sql, [userId],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send('😱 Error deleting an user');
        } else {
          res.status(200).send('🎉 User deleted!');
        }
      }
    );
  });

   

module.exports = router;
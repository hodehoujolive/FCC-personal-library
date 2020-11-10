'use strict';

const express = require('express');
const router = express.Router();
const {
  booksController
} = require('../controllers');

router.use((req, res, next) => {
  res.error = (error) => {
    console.log('[API Error]', error);
    res.status(400);
    res.json({ error: error.message });
  };
  next();
});

router.use(express.json());

router.route('/books')
  .get((req, res, next) => {
    booksController.list()
      .then(result => res.json(result))
      .catch(res.error);
  })
  .post((req, res, next) => {
    booksController.add(req.body.title, req.body.author)
      .then(result => res.json(result))
      .catch(res.error);
  });

// Unmatched routes
router.use((req, res) => {
  res.error({ error: 'Unknown route'});
});

module.exports = router;

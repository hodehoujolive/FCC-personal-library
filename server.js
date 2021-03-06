'use strict';

const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'test'
  ? process.env.PORT_TEST
  : process.env.PORT;
const helmet = require('helmet');
const { api, monitor }  = require('./routes');

// Common middleware
app.use(helmet.contentSecurityPolicy({
  directives: {
    scriptSrc: ["'self'", "'unsafe-eval'"],
    imgSrc: ["'self'", "data:"],
    styleSrc: ["'unsafe-inline'", "'self'", "fonts.googleapis.com"],
    fontSrc: ["'self'", "data:", "fonts.gstatic.com"],
    defaultSrc: ["'self'"]
  }
}));
app.use(express.urlencoded({ extended: true }));

// Redirect routes for books home (for now)
app.get('/books/:title', (req, res) => res.redirect('/'));

// Static assets
app.use(express.static('public/build'));

// freeCodeCamp test reporting
app.use('/_api', monitor);

// Client and API Routers
app.use('/api', api);

const listener = app.listen(port || 3000, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = listener; // Export for testing

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Genre = require('./models/genre');
Book = require('./models/book');

// Connect to Mongoose
mongoose.createConnection('mongodb://127.0.0.1/bookstore');

// We need db object
var db = mongoose.connection;

// we handle request
// 'slash /' represents homepage, and we run function once someone visits page, it takes responce and request object
// we can use response object, and send whatever we put here ('e.g. Hello world')
app.get('/', function(req, res) {  
   res.send('Hello Roman Jasko! Plese use /api/books or /api/genres');
});

app.get('/api/genres', function(req, res) {  
    Genre.getGenres(function (err, genres) {
       if (err) {
           throw err;
       }
       res.json(genres);
    });
 });

 app.get('/api/books', function(req, res) {  
    Book.getBooks(function (err, books) {
       if (err) {
           throw err;
       }
       res.json(books);
    });
 });


 app.get('/api/books/:_id', function(req, res) {  
    Book.getBookById(req.params._id, function (err, book) {
       if (err) {
           throw err;
       }
       res.json(book);
    });
 });

// before we run app, we need to say where to run, or where to listen - listen on port 3000
// let's make console.log so we know we are connected
app.listen(3000);
console.log('Running on port 3000...');


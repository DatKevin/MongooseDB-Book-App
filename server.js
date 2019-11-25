//--------------------------------SETUP
//require express in our app
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models")

// generate a new express app and call it 'app'
const app = express();

//--------------------------------he -MIDDLEWARE

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------------------CONFIGURATION VARIABLES
const PORT = process.env.PORT || 3000;

//----------------------------- TEMP DATA


let newBookUUID = 18;

// ----------------------------ROUTES

// define a root route: localhost:3000/
app.get('/',  (req, res) => {
  res.sendFile('views/index.html' , { root : __dirname});
});

//get all books
app.get("/api/books", (req,res) => {
  db.BookModel.find((err, books) => {
    if (err) {
      console.log("Get all books error: " + err)
      res.sendStatus(500)
    }
    res.json(books)  
  })
})


// get one book
app.get('/api/books/:id',  (req, res) => {
  // find one book by its id
  console.log('books show', req.params.id)
  let findid = {_id: req.params.id}
  db.BookModel.find(findid, (err, books) => {
    if (err) {
      console.log("Get single book error: ")
      res.sendStatus(500)
    }
    res.json(books)
  })
})

// create new book
app.use(express.json())

app.post('/api/books',  (req, res) => {
  // create new book with form data (`req.body`)
  let body = req.body
  console.log('books create', body);
  db.BookModel.create(body, (err, books) => {
    if (err) {
      console.log("Create book error: ")
      res.sendStatus(500)
    }
    res.json(body);
  })
})

// update book
app.put('/api/books/:id', (req,res) => {
// get book id from url params (`req.params`)
  console.log('books update', req.params);
  // find the index of the book we want to remove
  db.BookModel.findOneAndUpdate({"_id": req.params.id}, req.body, (err) => {
    if (err) {
      console.log("update book error: ")
      res.sendStatus(500)
    }
    res.send("updated")
  })
})

// delete book
app.delete('/api/books/:id',  (req, res) => {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params)
  // find the index of the book we want to remove
  db.BookModel.deleteOne({"_id": req.params.id}, (err) => {
    if (err) {
      console.log("delete book error: ")
      res.sendStatus(500)
    }
    res.send("deleted")

  })
})


// Start Server
app.listen(PORT, () => console.log(`Book app listening at http://localhost:${PORT}/`));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const dns = require('dns')
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

var c = 0
var url = ""

app.post('/api/shorturl', function (req, res) {
  url = req.body.url

  dns.lookup(url, function (err, address, family) {
    if (err) {
      res.json({
        error: 'invalid url'
      })
    }
    c = Math.random()
    res.json({
      original_url: url,
      short_url: c
    })
  })
})

app.get('/api/shorturl/:id', function (req, res) {
  if (req.params.id == c) {
    res.redirect(url)
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

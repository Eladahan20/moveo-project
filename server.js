const express = require('express');
const request = require('request');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  app.get('/code1', function(req, res) {
    res.sendFile(path.join(__dirname, '/code1.html'));
  });

app.listen(port, () => {
    console.log('Server started');
  });
  
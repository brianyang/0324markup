// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 9000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve the HTML file
app.get('/slos.html', (req, res) => {
  fs.readFile('/Users/brian/Public/ipg2/markup/slos.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

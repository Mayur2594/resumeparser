const fs = require('fs');
const path = require('path')
const express = require('express');

var routes = require('./lib/routes');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next()
})

app.use(express.static(path.join(__dirname, 'app')));

routes.configure(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
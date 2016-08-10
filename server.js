var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Express server listening on port %d', port); 
});

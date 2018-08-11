const fs = require('fs');
const path = require('path');
const buildPath = (file) => {
  return path.join(__dirname, '..','public', file);
};
const handler = {
   indexHandler: (req, res) => {
     console.log(path.join(__dirname, '..'));
    fs.readFile(buildPath('index.html'),(err, file) => {
      if (err) {
        res.writeHead(500,{ 'Content-Type' : 'text/html' });
        res.end('Sorry, we could not retrieve the web page');
        console.log(err);
      } else {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(file);
      }
    });
  }
};

module.exports = handler;

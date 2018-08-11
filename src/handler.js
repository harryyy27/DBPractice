
//require modules + buildPath for path.join
const fs = require('fs');
const path = require('path');
const buildPath = (file) => {
  return path.join(__dirname, '..','public', file);
};

//build object containing handler functions
const handler = {
   indexHandler: (req, res) => {
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
  },
  publicHandler: (req, res) => {

    const ext= req.url.split('.')[1];
    const url = req.url.split('/')[2];
    const cType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
    };
    fs.readFile(buildPath(`${url}`), (err,file) => {
      if(err) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('No web page retrieved');
        console.log(err);
      }
      else {
        res.writeHead(200, {'Content-Type': 'cType[ext]'});
        res.end(file);
      }

    });
  }
};

module.exports = handler;

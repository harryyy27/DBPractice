
//require modules + buildPath for path.join
const fs = require('fs');
const path = require('path');
const buildPath = (file) => {
  return path.join(__dirname, '..','public', file);
};

//build object containing handler functions
const handler = {
  cType: {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
  },
   indexHandler: (req,res) => {
    fs.readFile(buildPath('index.html'),(err, file) => {
      if (err){
        res.writeHead(500, {'Content-Type': 'text/html'}, "you've been hacked")
        res.end();
        console.log(err);
      }
      else {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(file);
    }
  });
  },
  publicHandler: (req, res) => {
    const ext= req.url.split('.')[1];
    const url = req.url.split('/')[2];
    fs.readFile(buildPath(`${url}`), (err,file) => {
      if(err) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('No web page retrieved');
        console.log(err);
      }
      else {
        res.writeHead(200, {'Content-Type': `${handler.cType[ext]}`});
        res.end(file);
      }

    });
  }
};

module.exports = handler;

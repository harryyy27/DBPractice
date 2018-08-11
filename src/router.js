const handler = require('./handler.js');

const router = (req, res) => {
  console.log(req.url);
  if(req.url === '/') {
    handler.indexHandler(req,res);

  }
  else if (req.url.includes('public')=== true){

    handler.publicHandler(req,res);
  }
  else {
    res.writeHead(500, {'Content-Type': 'text/html'}, "you've been hacked")
    res.end();
  }
}

module.exports = router;

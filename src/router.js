const handler = require('./handler.js');

const router = (req, res) => {
  console.log(req.url);
  if(req.url === '/') {
    handler.indexHandler(req,res);

  }
  else if (req.url.includes('public')=== true){

    handler.publicHandler(req,res);
  }
}

module.exports = router;

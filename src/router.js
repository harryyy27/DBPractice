const handler = require('./handler.js');

const router = (req, res) => {
  if(req.url === '/') {
    handler.indexHandler(req,res);
  }
  // else if (req.url.includes('public')=== true){
  //   publicHandler(req,res);
  // }
}

module.exports = router;

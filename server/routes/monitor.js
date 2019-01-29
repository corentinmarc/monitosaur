var os = require('os');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  cpus = os.cpus().length;
  loadAvg = os.loadavg()[0]/cpus;
  freemem = os.freemem();
  totalmem = os.totalmem();

  res.send({
    cpus,
    loadAvg,
    freemem,
    totalmem,
  });
});

module.exports = router;

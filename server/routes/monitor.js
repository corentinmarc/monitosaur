var os = require('os');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  cpus = os.cpus().length;
  loadAvg = os.loadavg()[0]/cpus;
  freemem = os.freemem();
  totalmem = os.totalmem();
  timestamp = Date.now();

  res.header("Access-Control-Allow-Origin", "*");

  res.send({
    cpus,
    loadAvg,
    freemem,
    totalmem,
    timestamp,
  });
});

module.exports = router;

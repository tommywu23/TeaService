/**
 * Created by tommy on 15/6/17.
 */

var express = require('express');
var router = express.Router();
var po = require('../models/model');

router.get('/', function(req, res) {
    var p = po.getService();
    //console.log(p);
    _.sortBy(p, 'status');
    res.render('index', { title: "会务服务", data : p});
});

module.exports = router;
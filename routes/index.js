/**
 * Created by tommy on 15/6/17.
 */

var express = require('express');
var router = express.Router();
var po = require('../models/model');

router.get('/', function(req, res) {
    res.render('index', { title: "会务服务", data : po.getService()});
});

module.exports = router;
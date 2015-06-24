/**
 * Created by tommy on 15/6/17.
 */

var express = require('express');
var router = express.Router();
var po = require('../models/model');

router.get('/', function(req, res) {
    var p = po.getService();
    p = _.groupBy(p,function(item){return item.status == '请求'});
    var pi = _.union(p.true, p.false);
    res.render('index', { title: "会务服务", data : pi});
});

module.exports = router;
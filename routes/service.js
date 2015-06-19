/**
 * Created by tommy on 15/6/17.
 */

var express = require('express');
var http = require('request-json');
var router = express.Router();
var po = require('../models/model');

router.post('/', function(req, res) {
    var p = req.body;
    if(p.id == undefined || p.id == ""){
        res.sendStatus(400);
        return;
    }

    if(po.isExist(p.id)){
        res.sendStatus(309);
        return;
    }else{
        po.addService(po.builder(p),function(msg){
            global.io.emit("add", msg);
        });
    }

    res.sendStatus(200);
});

router.get('/', function(req, res) {
    res.send(po.getService());
});

router.get('/:id', function(req, res) {
    res.send(po.getServiceById(req.param('id')));
});

router.delete('/:id', function(req, res) {
    var id = req.param('id');

    if(id == undefined || id == ""){
        res.sendStatus(400);
        return;
    }

    if(!po.isExist(id)){
        res.sendStatus(404);
        return;
    }else{
        po.removeService(id);
    }

    res.send(req.body);
});

router.patch('/',function(req, res){
    var p = req.body;

    if(p.id == undefined || p.id == ""){
        res.sendStatus(400);
        return;
    }

    if(!po.isExist(p.id)){
        res.sendStatus(404);
        return;
    }else{
        po.updateService(p.id,function(msg){
            var url = global.config.eventserviceurl;
            var client = http.createClient(url);
            var req = {};
            req.event = "service";
            req.params = {"id": msg};

            client.post('notify/', req, function(err, res, body) {
            });
        });
    }

    res.send(p);
});

module.exports = router;
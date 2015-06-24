/**
 * Created by tommy on 15/6/17.
 */

var data = [];

var models = {
    builder : function(d){
        var result = {};
        result.id = d.id;
        result.name = d.name;
        result.chairname = d.chairname;
        result.service = d.service;
        result.createtime = d.createtime;
        result.status = "请求";
        return result;
    },
    isExist : function(id){
        if(data.length == 0) return false;
        return data.filter(function(item){
            return item.id == id;
        }).length > 0;
    },
    addService : function(item, callback){
        data.push(item);
        if(callback) callback(item);
    },
    removeService : function(id){
        data.forEach(function(item){
            if(item.id == id){
                data.splice(data.indexOf(item),1);
            }
        });
    },
    updateService : function(id, callback){
        data.forEach(function(item){
            if(item.id == id){
                item.status = "已接受";
            }
        });

        if(callback) callback(id);
    },
    getServiceById : function(id){
        return data.filter(function(item){
            return item.id == id;
        });
    },
    getService : function () {
        return data;
    }
};

exports = module.exports = models;
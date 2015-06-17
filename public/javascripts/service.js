/**
 * Created by tommy on 15/6/17.
 */
function btnclick(id){
    alert(id);
}

var socket = io();

socket.on('add', function(msg){
    var p = $('#service');
    p.append($('<span>').text(msg.id));
    p.append($('<span>').text(msg.status));
});


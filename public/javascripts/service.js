/**
 * Created by tommy on 15/6/17.
 */
function btnclick(id){
    $.ajax({
        url: '/service',
        data:{ id:id },
        type: 'patch',
        async: false,
        dataType: 'json',
        success: function (data) {
          window.location.reload();
        }
    });
}

var socket = io();

socket.on('add', function(msg){
    var p = $('#service');
    p.append($('<span>').text(msg.id));
    p.append($('<span>').text(msg.name));
    p.append($('<span>').text(msg.chairname));
    p.append($('<span>').text(msg.service));
    p.append($('<span>').text(msg.status));
    p.append($('<button>').text("处理").click(function() {
        btnclick(msg.id);
    }));
});


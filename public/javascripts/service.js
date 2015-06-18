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
            $('td#td_'+id).find('button').remove();
            $('td#td_'+id).append($('<button class="btn btn-lg btn-danger" style="margin-left:100px;">').text("删除").click(function() {
                deletes(id);
            }));
            $('tr#'+id).find('td[style="background-color:#B22222;color:#fff;"]').text('已接受').attr('style','background-color:#008000;color:#fff;');
        }
    });
}

function deletes(id) {
    alert(id);
    $.ajax({
        url: '/service/' + id,
        type: 'delete',
        async: false,
        dataType: 'json',
        success: function (data) {
            alert(111);
            $('#service').find('tr#'+id).remove();
        }
    });
}

var socket = io();

socket.on('add', function(msg){
    var p = $('#service');
    p.prepend($('<tr>').attr('id',msg.id));
    var a = $('tr#'+msg.id);
    a.append($('<td>').attr('id','td_img'+msg.id));
    var b = $('td#td_img'+msg.id);
    b.append($('<img>').attr({"src":'/images/'+msg.service+'.png',"style":"width:30px;margin-right:10px;"}));
    b.append($('<span>').text(msg.service));
    a.append($('<td>').text(msg.createtime));
    a.append($('<td>').text(msg.name));
    a.append($('<td>').text(msg.chairname));
    a.append($('<td style="background-color:#B22222;color:#fff;">').text(msg.status));
    a.append($('<td>').attr('id','td_'+msg.id));
    var c = $('td#td_'+msg.id);
    c.append($('<button class="btn btn-lg btn-primary" style="margin-left:100px;">').text("处理").click(function() {
        btnclick(msg.id);
    }));
});

function select(a,b) {
    var item = document.getElementById("List");
    var num = item.rows.length;
    for(var i=1;i<num;i++){
        item.rows[i].style.display='';
        if(item.rows[i].cells[4].innerText==a || item.rows[i].cells[4].innerText==b){
        }else{
            item.rows[i].style.display='none'
        }
    }
}

var TODO = '请求';
var DOING = '已接受';

function request(obj){
    select(TODO,null);
    shaixuan(obj);
}

function accepted(obj){
    select(DOING,null);
    shaixuan(obj);
}

function selectAll(obj){
    select(TODO,DOING);
    shaixuan(obj);
}

function shaixuan(obj){
    $(".shaixuan").removeClass('btn-primary').addClass('btn-default active');
    $(obj).addClass('btn-primary').removeClass('btn-default active');
}
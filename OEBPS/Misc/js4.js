fn24cvsheight = 180;
fn24cvswidth = 280;
fn24cvs = new Array();
fn24ctx = new Array();
fn24flg = new Array();
fn24oldx = new Array();
fn24oldy = new Array();
fn24first = new Array();

function fn24init(){
    fn24cvs[0] = document.getElementById("fn24canvas");
    fn24cvs[0].addEventListener("mousedown", fn24mdown, false);
    fn24cvs[0].addEventListener("mousemove", fn24mmove, false);
    fn24cvs[0].addEventListener("mouseout", fn24mup, false);
    fn24cvs[0].addEventListener("mouseup", fn24mup, false);
    fn24cvs[0].addEventListener("touchstart", fn24mdown, false);
    fn24cvs[0].addEventListener("touchmove", fn24mmove, false);
    fn24cvs[0].addEventListener("touchend", fn24mup, false);
    fn24cvs[0].addEventListener("touchcancel", fn24mup, false);
    fn24ctx[0] = fn24cvs[0].getContext("2d");
    if(!fn24first[0]){
        fn24clear();
        fn24first[0] = true;
    }
    var fn24 = document.getElementById("fn24editbutton1");
    fn24.value = "完了";
    fn24.onclick = new Function("fn24end();");
}

function fn24end(){
    fn24cvs[0] = document.getElementById("fn24canvas");
    fn24cvs[0].removeEventListener("mousedown", fn24mdown, false);
    fn24cvs[0].removeEventListener("mousemove", fn24mmove, false);
    fn24cvs[0].removeEventListener("mouseout", fn24mup, false);
    fn24cvs[0].removeEventListener("mouseup", fn24mup, false);
    fn24cvs[0].removeEventListener("touchstart", fn24mdown, false);
    fn24cvs[0].removeEventListener("touchmove", fn24mmove, false);
    fn24cvs[0].removeEventListener("touchend", fn24mup, false);
    fn24cvs[0].removeEventListener("touchcancel", fn24mup, false);
    var fn24 = document.getElementById("fn24editbutton1");
    fn24.value = "描く";
    fn24.onclick = new Function("fn24init();");
}

function fn24clear(){
    fn24ctx[0].fillStyle = "#ffffff";
    fn24ctx[0].fillRect(0,0,fn24cvswidth,fn24cvsheight);
}

function fn24mdown(e){
    fn24flg[0] = true;
    var rect = e.target.getBoundingClientRect();
    //iPad or iPhone
    var iPad = navigator.userAgent.match(/iPad/i) != null;
    var iPhone = navigator.userAgent.match(/iPhone/i) != null;
    if(iPad || iPhone){
        fn24oldx[0] = e.touches[0].pageX - rect.left;
        fn24oldy[0] = e.touches[0].pageY - rect.top;
    }else{
        fn24oldx[0] = e.clientX - rect.left;
        fn24oldy[0] = e.clientY - rect.top;
    }
}

function fn24mmove(e){
    if(fn24flg[0]){
        var rect = e.target.getBoundingClientRect();
        //iPad or iPhone
        e.preventDefault();
        var iPad = navigator.userAgent.match(/iPad/i) != null;
        var iPhone = navigator.userAgent.match(/iPhone/i) != null;
        if(iPad || iPhone){
            x = e.touches[0].pageX - rect.left;
            y = e.touches[0].pageY - rect.top;
        }else{
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        fn24ctx[0].lineCap = "round";
        fn24ctx[0].lineJoin = "round";
        fn24ctx[0].beginPath();
        fn24ctx[0].moveTo(fn24oldx[0], fn24oldy[0]);
        fn24ctx[0].lineTo(x, y);
        fn24ctx[0].closePath();
        fn24ctx[0].stroke();
        fn24oldx[0] = x;
        fn24oldy[0] = y;
    }
}

function fn24mup(e){
    fn24flg[0] = false;
}

//機能名
var fn24editflg = new Array();
var fn24editvalue = new Array();
var fn24editnum = 0;

function fn24addnote(){
    fn24editnum++;
if(fn24editnum>1){
    alert("今回はノート1つだけで勘弁してください");
}else{
    fn24editflg[fn24editnum] = true;
    fn24editvalue[fn24editnum] = "めも"+fn24editnum;
    var fn24note = "<a href='#func24' id='fn24open"+fn24editnum+"' style='display:none' onclick='fn24openevent("+fn24editnum+")'>メモ"+fn24editnum+"表示</a><div id='modalbox"+fn24editnum+"' class='modalbox'><input type='button' value='描く'  id='fn24editbutton"+fn24editnum+"' class='fn23editbutton' onclick='fn24init()' /><input type='button' value='クリア'  id='fn24clearbutton"+fn24editnum+"' class='fn23deletebutton' onclick='fn24clear()' /><a href='#func24' class='fn23close' onclick='fn24closeevent("+fn24editnum+")'>隠す</a><canvas id='fn24canvas' width='"+fn24cvswidth+"' height='"+fn24cvsheight+"'></canvas></div>";
    $("#fn24area").append(fn24note);
    $("#modalbox"+fn24editnum).fadeIn(500);
}
}

//閉じる
function fn24closeevent(num){
    $("#modalbox"+num).fadeOut(500);
    document.getElementById("fn24open"+num).style.display = "";
}
//開ける
function fn24openevent(num){
    document.getElementById("fn24open"+num).style.display = "none";
    $("#modalbox"+num).fadeIn(500);
}

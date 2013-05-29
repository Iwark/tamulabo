//機能名
var fn23editflg = new Array();
var fn23editvalue = new Array();
var fn23editnum = 0;

function fn23addnote(){
    fn23editnum++;
    fn23editflg[fn23editnum] = true;
    fn23editvalue[fn23editnum] = "めも"+fn23editnum;
    var fn23note = "<a href='#func23' id='fn23open"+fn23editnum+"' style='display:none' onclick='fn23openevent("+fn23editnum+")'>メモ"+fn23editnum+"表示</a><div id='modalbox"+fn23editnum+"' class='modalbox'><input type='button' value='編集'  id='fn23editbutton"+fn23editnum+"' class='fn23editbutton' onclick='fn23edit("+fn23editnum+")' /><input type='button' value='削除'  id='fn23deletebutton"+fn23editnum+"' class='fn23deletebutton' onclick='fn23delete("+fn23editnum+")' /><a href='#func23' class='fn23close' onclick='fn23closeevent("+fn23editnum+")'>隠す</a><div id='fn23textarea"+fn23editnum+"'>めも"+fn23editnum+"</div></div>";
    $("#fn23area").append(fn23note);
    $("#modalbox"+fn23editnum).fadeIn(500);
}

//閉じる
function fn23closeevent(num){
    $("#modalbox"+num).fadeOut(500);
    document.getElementById("fn23open"+num).style.display = "";
}
//開ける
function fn23openevent(num){
    document.getElementById("fn23open"+num).style.display = "none";
    $("#modalbox"+num).fadeIn(500);
}
//削除する
function fn23delete(num){
    $("#fn23open"+num).remove();
    $("#modalbox"+num).remove();
}
//編集する
function fn23edit(num){

    if(fn23editflg[num]){
        fn23editflg[num] = false;
        document.getElementById("fn23editbutton"+num).value = "完了";
        $("#modalbox"+num).append("<textarea id='fn23editarea"+num+"' class='fn23editarea'></textarea>");
        document.getElementById("fn23editarea"+num).value = fn23editvalue[num];
        document.getElementById("fn23textarea"+num).innerHTML = "";
    }else{
        fn23editflg[num] = true;
        document.getElementById("fn23editbutton"+num).value = "編集";
        fn23editvalue[num] = document.getElementById("fn23editarea"+num).value;
        fn23editvalue[num]=fn23editvalue[num].replace(/\n/g,"<br />").replace(/\r/g,"");    //改行を反映
        document.getElementById("fn23textarea"+num).innerHTML = fn23editvalue[num];
        $("#fn23editarea"+num).remove();
    }
    
}
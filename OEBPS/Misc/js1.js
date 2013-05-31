//機能名

function tbdisabled(){
    //iBooksを想定して、テキストボックスのdisabledを解除する
    document.getElementById("fn45tb1").disabled = false;
}

function able(){
    $("form :text").attr("disabled",null);
    $("form :password").attr("disabled",null);
}

/* ------------fn11------------ */
var fn11hintflg = true;
function fn11hint(){
    if(fn11hintflg){
        fn11hintflg = false;
        document.getElementById("fn11hint").value = "ヒントを隠す";
        document.getElementById("fn11hintarea").innerHTML = "選択肢の中に1つだけ食べられないものがあるよ！";
    }else{
        fn11hintflg = true;
        document.getElementById("fn11hint").value = "ヒントを見る";
        document.getElementById("fn11hintarea").innerHTML = "";
    }
}

function fn11answer(){
    if(document.getElementsByName("fn11quiz")[2].checked){
            document.getElementById("fn11answerarea").innerHTML = "大正解！フライパンは「パン」が付くけど食べられないんだ。";
    }else{
        document.getElementById("fn11answerarea").innerHTML = "不正解・・・それは食べられるパンだよ。美味しいよ。";
    }
}

/* ------------fn12------------ */

/* ------------fn23------------ */

/* ------------fn24------------ */

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
    var fn24 = document.getElementById("fn24editbutton");
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
    var fn24 = document.getElementById("fn24editbutton");
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
        fn24oldx[0] = e.touches[0].clientX - rect.left;
        fn24oldy[0] = e.touches[0].clientY - rect.top;
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
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
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
    var fn24note = "<a href='#' id='fn24open"+fn24editnum+"' style='display:none' onclick='fn24openevent("+fn24editnum+")'>メモ"+fn24editnum+"表示</a><div id='modalbox"+fn24editnum+"' class='modalbox'><input type='button' value='描く'  id='fn24editbutton"+fn24editnum+"' class='fn23editbutton' onclick='fn24init()' /><input type='button' value='クリア'  id='fn24clearbutton"+fn24editnum+"' class='fn23deletebutton' onclick='fn24clear()' /><a href='#' class='fn23close' onclick='fn24closeevent("+fn24editnum+")'>隠す</a><canvas id='fn24canvas' width='"+fn24cvswidth+"' height='"+fn24cvsheight+"'></canvas></div>";
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


/* ------------fn36------------ */
var fn36flg = true;
function fn36changemode(){

    var aNode = document.getElementById("fn36area");
    for (var i =aNode.childNodes.length-1; i>=0; i--) {
        aNode.removeChild(aNode.childNodes[i]);
    }

    var ele = "";
    if(fn36flg){

        fn36flg = false;
        document.getElementById("fn36modebutton").value="iframeでの制御を止める";

        ele = document.createElement("a");
        ele.href = "Section02.xhtml";
        ele.target = "fn36ifrm1";
        ele.innerHTML = "1章";
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("a");
        ele.href = "Section03.xhtml";
        ele.target = "fn36ifrm1";
        ele.innerHTML = "2章";
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("input");
        ele.type = "range";
        ele.id = "fn36range1";
        ele.min = "0";
        ele.max = "300";
        ele.step = "10";
        ele.value = "150";
        ele.onchange = fn36gamenkousei;
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("a");
        ele.href = "Section02.xhtml";
        ele.target = "fn36ifrm2";
        ele.innerHTML = "1章";
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("a");
        ele.href = "Section03.xhtml";
        ele.target = "fn36ifrm2";
        ele.innerHTML = "2章";
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("br");
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("iframe");
        ele.src = "Section02.xhtml";
        ele.name = "fn36ifrm1";
        ele.id = "fn36ifrm1";
        ele.height = "150px";
        ele.overflow = "scroll";
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("br");
        document.getElementById("fn36area").appendChild(ele);
        ele="";

        ele = document.createElement("iframe");
        ele.src = "Section03.xhtml";
        ele.name = "fn36ifrm2";
        ele.id = "fn36ifrm2";
        ele.height = "150px";
        ele.overflow = "scroll";
        document.getElementById("fn36area").appendChild(ele);
        ele="";

    }else{

        fn36flg = true;
        document.getElementById("fn36modebutton").value="iframeで制御してみる";

    }
}

function fn36gamenkousei(){
    var fn36value = document.getElementById("fn36range1").value;
    document.getElementById("fn36ifrm1").style.height = fn36value + "px";
    document.getElementById("fn36ifrm2").style.height = (300 - fn36value)  + "px";
}

function fn36sizechange(fn36up, fn36un){
	document.getElementById("fn36cssup").style.height = fn36up+"px";
	document.getElementById("fn36cssun").style.height = fn36un+"px";
}

function fn36go(target, chapter){
	if(target == "ue"){
		new Ajax.Updater($("fn36cssup"), chapter+".xhtml");
	}else{
		new Ajax.Updater($("fn36cssun"), chapter+".xhtml");
	}
}


/* ------------fn37------------ */
var fn37gpsid;
//fn37-センサ情報の取得
function fn37senssor(){
    var fn37result = "取得中...";
    document.getElementById("fn37span1").innerHTML = fn37result;

    //GPS
    var fn37ido;
    var fn37keido;
    fn37gpsid = navigator.geolocation.watchPosition(fn37gpsok,fn37gpsng);

    //加速度
    window.addEventListener("devicemotion", fn37kasokudoevent);
}

function fn37senssorremove(){
    navigator.geolocation.clearWatch(fn37gpsid);
    window.removeEventListener("devicemotion", fn37kasokudoevent);
}

function fn37gpsok(fn37gps){
    var fn37ido = fn37gps.coords.latitude;
    var fn37keido = fn37gps.coords.longitude;
    var fn37result = "緯度："+fn37ido+"<br />経度："+fn37keido+"<br />";
    document.getElementById("fn37span1").innerHTML = fn37result;
}

function fn37gpsng(fn37gps){
    var fn37result = "GPSエラー："+fn37gps.message+"<br />";
    document.getElementById("fn37span1").innerHTML = fn37result;
}

function fn37kasokudoevent(fn37kskd){
    var fn37kasokudo = fn37kskd.acceleration;
    var fn37result = "X軸の加速度："+fn37kasokudo.x+"<br />Y軸の加速度："+fn37kasokudo.y+"<br />Z軸の加速度："+fn37kasokudo.z+"<br />";
    document.getElementById("fn37span2").innerHTML = fn37result;
}

//fn45-正誤判定を行なう
function fn45seigohantei(){
    var fn45value1 = document.getElementById("fn45tb1").value;
    var fn45result = "ここに正誤判定の結果が表示されます。";
    if(fn45value1 == ""){
        document.getElementById("fn45span1").innerHTML = fn45result;
    }else if(fn45value1 == 5){
        fn45result = "正解です！よくできました。";
        document.getElementById("fn45span1").innerHTML = fn45result;
    }else{
        fn45result = "残念、不正解です・・・"+fn45value1+"ではありません。";
        document.getElementById("fn45span1").innerHTML = fn45result;
    }
}


/*        fn46           */

function fn46check(){

    //LocalStorage
    var fn46LSmsg = "";
    if(!window.localStorage){
        fn46LSmsg = "LocalStorageを利用できません。";
    }else{
        fn46LSmsg = "OK";
        var fn46LSnum = Number(localStorage.getItem("fn46LSkey"));
        if(fn46LSnum == ""){
            localStorage.setItem("fn46LSkey", "1");
            fn46LSmsg = "初めて利用しました。";
        }else{
            fn46LSnum++;
            localStorage.setItem("fn46LSkey", fn46LSnum);
            fn46LSmsg = fn46LSnum+"回目の利用です。";
        }
    }
    document.getElementById("fn46LS").innerHTML = fn46LSmsg;

    //FileSystemAPI
    var fn46FSmsg="";
    if(!window.File){
        fn46FSmsg="FileAPIを利用出来ません。";
    }else{
        window.requestFileSystem  = window.requestFileSystem ||
                                    window.webkitRequestFileSystem;
        window.webkitStorageInfo.requestQuota(window.TEMPORARY, 1024,
            function(fn46FSsize){
                window.webkitRequestFileSystem(window.TEMPORARY,fn46FSsize,
                    fn46FSsuccess,
                    errorHandler
                    //function(e){fn46FSmsg="エラー："+e.code;}
                );
            },
            function(e){
                fn46FSmsg=e;
            }
        );
    }
    document.getElementById("fn46FS").innerHTML += fn46FSmsg;

    //WebSQL
    var fn46WSQLmsg = document.getElementById("fn46WSQL");
    if(!window.openDatabase){
        fn46WSQLmsg.innerHTML = "利用不可";
    }else{
        fn46WSQLmsg.innerHTML = "たぶん利用可能";
        var fn46db = window.openDatabase("fn46WSQLDB", "1.0", "fn46WSPLDB", "1024");
        fn46db.transaction(
        	function(fn46tr){
        		fn46tr.executeSql("CREATE TABLE IF NOT EXISTS test(key, value)", [],
        			function(){fn46WSQLmsg.innerHTML = "テーブル作成成功";},
        			function(){alert("利用不可（テーブル作成失敗）");}
        		);
        		fn46tr.executeSql("SELECT value FROM test WHERE key=\"fn46WSQLkey\"", [],
        			function(fn46tr2, fn46row){
						if(fn46row.rows.length>0){
        					var fn46WSQLnum = fn46row.rows.item(0).value;
        					fn46WSQLnum++;
        					fn46tr.executeSql("UPDATE test SET value="+fn46WSQLnum+" WHERE key=\"fn46WSQLkey\"", [],
        						function(){
        							fn46WSQLmsg.innerHTML = fn46WSQLnum+"回目の利用です。";
        						},
        						function(){alert("利用不可（更新エラー）");}
        					);
        				}else{
        					fn46tr.executeSql("INSERT INTO test VALUES(?, ?)", ["fn46WSQLkey","1"],
        						function(){fn46WSQLmsg.innerHTML = "初めての利用です。";},
        						function(){alert("利用不可（インサートエラー）");}
        					);
        				}
        			},
        			function(){
        				alert("利用不可(セレクトエラー)");
        				/*
        				fn46tr.executeSql("INSERT INTO test VALUES(?, ?)", ["fn46WSQLkey","1"],
        					function(){fn46WSQLmsg.innerHTML = "初めての利用です。";},
        					function(){alert("利用不可（インサートエラー）");}
        				);
        				*/
        			}
        		);
        	}
        );
    }

    //IndexedDB(参考：http://dev.classmethod.jp/ria/html5/html5-indexed-database-api/)
    var fn46IDBmsg="";
    var db;
    var indexedDB = window.indexedDB
                    || window.mozIndexedDB
                    || window.msIndexedDB;
    if(!indexedDB){
        fn46IDBmsg = "利用不可";
    }else{
        fn46IDBinit();
    }
    document.getElementById("fn46IDB").innerHTML = fn46IDBmsg;

}

//IDB
var db;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

function fn46IDBinit(){
	var fn46IDBmsg3 = document.getElementById("fn46IDB");
	var openRequest = indexedDB.open("fn46db", 1.0);

    openRequest.onupgradeneeded = function(event) {
    	// データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
    	//alert("最初の利用");
    	db = event.target.result;
    	var store = db.createObjectStore("fn46store", { keyPath: "fn46key"});
    	store.createIndex("fn46valueIndex", "fn46value");
    }

    openRequest.onsuccess = function(event) {
    	db = event.target.result;
    	getValue("fn46IDBkey");
    }

    openRequest.onerror = function(event) {
    	fn46IDBmsg3.innerHTML = "利用できません。";
    }
}

function fn46createOBS(fn46setvalue){
	var fn46IDBmsg2 = document.getElementById("fn46IDB");
	var key = "fn46IDBkey";
    var value = {};
    value["fn46key"] = key;
    value["fn46value"] = Number(fn46setvalue);
    var transaction = db.transaction(["fn46store"], "readwrite");
    var store = transaction.objectStore("fn46store");

    var request = store.put(value);
    request.onsuccess = function (event) {
    	fn46IDBmsg2.innerHTML = value["fn46value"]+"回目の利用です。";
    }
    request.onerror = function (event) {
    	fn46IDBmsg2.innerHTML = "エラー。";
    }

}

function getValue(fn46keyname) {

    var transaction = db.transaction(["fn46store"], "readwrite");
    var store = transaction.objectStore("fn46store");

    var request = store.get(fn46keyname);
    request.onsuccess = function (event) {
    	if(event.target.result === undefined) {
    		//alert("getValueU:"+event.target.result);
        	fn46createOBS(1);
        }else{
        	var fn46gv = event.target.result.fn46value;
        	fn46gv++;
    		fn46createOBS(fn46gv);
        }
	}
}



//ファイルシステム要求成功時のコールバック
    function fn46FSsuccess(fs) {
        var fn46FSscs = "";
        fs.root.getFile('fn46FS.txt', {create: true}, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                    fn46FSscs = "FileAPIwriterを利用可能です。";
                    document.getElementById("fn46FS").innerHTML = fn46FSscs;
                };
                fileWriter.onerror = function(e) {
                    fn46FSscs = "FileAPIwriterを利用できません。";
                    document.getElementById("fn46FS").innerHTML = fn46FSscs;
                };
                var blobData = new window.Blob(['1']);
                fileWriter.write(blobData);
            }, errorHandler);
        }, errorHandler);
    }
    //エラーハンドラ
    function errorHandler(e) {
      var msg = '';
      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = 'QUOTA_EXCEEDED_ERR';
          break;
        case FileError.NOT_FOUND_ERR:
          msg = 'NOT_FOUND_ERR';
          break;
        case FileError.SECURITY_ERR:
          msg = 'SECURITY_ERR';
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = 'INVALID_MODIFICATION_ERR';
          break;
        case FileError.INVALID_STATE_ERR:
          msg = 'INVALID_STATE_ERR';
          break;
        default:
          msg = 'Unknown Error';
          break;
      };
      document.getElementById("fn46FS").innerHTML =  "利用不可："+msg;
    }



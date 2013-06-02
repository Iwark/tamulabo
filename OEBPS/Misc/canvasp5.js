var canvas;	//キャンバス
var c;	//キャンバスコンテキスト
cw=200;	//キャンバス横
ch=150;	//キャンバス縦

dx=-25;	//開始x
dy=-25;	//開始y
wx=250;	//長さx
wy=200;	//長さy

xmin=0;
xmax=6;
ymin=0;
ymax=5;

count = 0;
var pntx = new Array();
var pnty = new Array();

hflg = true;

var lineL = 2;	//線の太さ
mex = new Array();
mxc = 0;
mey = new Array();
myc = 0;

window.onload = function() {
	init();
};

function init() {
	canvas = document.getElementById("canvas1");
	c = canvas.getContext("2d");
	draw();
}



function del(){
	hflg = true;
	draw();
}

function draw(){
	
	if(hflg){
		count = 0;
		mxc = 0;
		myc = 0;
		mex[mxc] = dx+0.5;
		mey[myc] = dy+0.5;
		mxc++;
		myc++;
		pntx[0] = -1;
		pntx[1] = -2;
		pnty[0] = -1;
		pnty[1] = -2;
		
		c.clearRect(0, 0, cw, ch);
		var a = xmax-xmin
		var sx = dx;
		var sy = dy;
		c.fillStyle = "#000000";
		c.strokeStyle = "#ccccff";
		c.font = "14px 'Times New Roman'";
		for(i=1;i<a;i++){	//xに罫線
			sx += Math.floor(wx*(1/a));
			c.beginPath();
			c.moveTo(sx+0.5, sy);
			c.lineTo(sx+0.5, sy+wy);
			c.closePath();
			c.stroke();
			c.fillText(xmin+i, sx-2, sy+wy+17);
			
			mex[mxc] = sx+0.5;
			mxc++;
		}
		
		var a = ymax-ymin
		var sx = dx;
		var sy = dy;
		c.strokeStyle = "#ccccff";
		for(i=1;i<a;i++){	//yに罫線
			sy += Math.floor(wy*(1/a));
			c.beginPath();
			c.moveTo(sx, sy+0.5);
			c.lineTo(sx+wx, sy+0.5);
			c.closePath();
			c.stroke();
			c.fillText(ymax-i, sx-15, sy+5);
			
			mey[myc] = sy+0.5;
			myc++;
		}
		
		c.strokeStyle = "#3333ff";	//囲み線
		c.beginPath();
		c.strokeRect(1,1,cw-2,ch-2);
		c.stroke();
		
		c.strokeStyle = "#000000";	//数字
		c.font = "40px 'ＭＳ Ｐゴシック'";
		c.fillText(0, mex[2]+10, mey[2]-6);
		c.fillText(5, mex[3]+10, mey[2]-6);
		c.fillText(7, mex[4]+10, mey[2]-6);
		c.fillText(3, mex[3]+10, mey[3]-6);
		c.fillText(6, mex[4]+10, mey[3]-6);		
		
		c.beginPath();	//小数点
		c.fillStyle = "#000000";
		c.arc(mex[3], mey[2] - 6, lineL , 0, Math.PI * 2, false);
		c.arc(mex[4], mey[3] - 6, lineL , 0, Math.PI * 2, false);
		c.fill();
		
		c.lineWidth = 1.3;	//線引き
		c.beginPath();
		c.moveTo(mex[1] - 10, mey[3]);
		c.lineTo(mex[5] + 10, mey[3]);
		c.stroke();
		
		c.beginPath();	//×の記号
		c.moveTo(mex[1] + 10, mey[3] - 10);
		c.lineTo(mex[2] - 10, mey[2] + 10);
		c.stroke();
		
		c.beginPath();	//×の記号
		c.moveTo(mex[1] + 10, mey[2] + 10);
		c.lineTo(mex[2] - 10, mey[3] - 10);
		c.stroke();
		
		hflg = false;
	}
}

function m1(){
    var m1k = 0;
    var fk1 = document.getElementById('k1');
    fk1.innerHTML = '';

    if(document.getElementById('m1n1').value == '1.725'){
        m1k++;
    }else{fk1.innerHTML+='①, ';}
    
    if(document.getElementById('m1n2').value == '1.274'){
        m1k++;
    }else{fk1.innerHTML+='②, ';}
    
    if(document.getElementById('m1n3').value == '2.576'){
        m1k++;
    }else{fk1.innerHTML+='③, ';}
    
    if(document.getElementById('m1n4').value == '1.728'){
        m1k++;
    }else{fk1.innerHTML+='④ ';}
    
    
    if(m1k == 4){
        fk1.innerHTML += '<font color="#0000ff">全問正解です！</font><br />';
    }else{fk1.innerHTML += '<font color="#ff0000">が間違っています。</font><br />';}

}

function tbgo(){
    document.getElementById("my_name").disabled = "";
    document.getElementById("message").disabled = "";

}

function clear(){
	document.getElementById("月1").disabled = "";
	document.getElementById("月2").disabled = "";
	document.getElementById("月3").disabled = "";
	document.getElementById("月4").disabled = "";
	document.getElementById("月5").disabled = "";
	document.getElementById("月6").disabled = "";
	document.getElementById("火1").disabled = "";
	document.getElementById("火2").disabled = "";
	document.getElementById("火3").disabled = "";
	document.getElementById("火4").disabled = "";
	document.getElementById("火5").disabled = "";
	document.getElementById("火6").disabled = "";
	document.getElementById("水1").disabled = "";
	document.getElementById("水2").disabled = "";
	document.getElementById("水3").disabled = "";
	document.getElementById("水4").disabled = "";
	document.getElementById("水5").disabled = "";
	document.getElementById("水6").disabled = "";
	document.getElementById("木1").disabled = "";
	document.getElementById("木2").disabled = "";
	document.getElementById("木3").disabled = "";
	document.getElementById("木4").disabled = "";
	document.getElementById("木5").disabled = "";
	document.getElementById("木6").disabled = "";
	document.getElementById("金1").disabled = "";
	document.getElementById("金2").disabled = "";
	document.getElementById("金3").disabled = "";
	document.getElementById("金4").disabled = "";
	document.getElementById("金5").disabled = "";
	document.getElementById("金6").disabled = "";

}

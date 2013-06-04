var http_test = {};

(function(){
	"use strict";
	var req = new XMLHttpRequest();
	http_test.request = function(path,method,func){
		var url = "http://epubwebapi.herokuapp.com/"+path+".json";
		//var url = "http://localhost:3000/"+path+".json";
		req.onreadystatechange = function(){
			//通信が完了したら、受信したテキストを表示
			if(req.readyState == 4){
				var result = JSON.parse(req.responseText);
				func(result);
			}
		}
		req.open(method, url, true);
	}

	http_test.EncodeHTMLForm = function(data){
    var params = [];
    for( var name in data ){
        var value = data[ name ];
        var param = encodeURIComponent( name ).replace( /%20/g, '+' )
            + '=' + encodeURIComponent( value ).replace( /%20/g, '+' );
        params.push( param );
    }
    return params.join('&');
	}

	http_test.login = function(path,method){
		http_test.request(path,method,function(result){
			$("#read").html("ログインしました。ようこそ、"+result.name+"さん");
			alert("ログインしました。ようこそ、"+result.name+"さん");
		});
		req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		var e = {};
		e.name = $('#login_name').val();
		e.password = $('#login_password').val();
		req.send(http_test.EncodeHTMLForm( e ));
	}

	http_test.register = function(path,method){
		http_test.request(path,method,function(result){
			$("#read").html("ようこそ、"+result.name+"さん：<a href=\"Section0002.xhtml\">こちら</a>へどうぞ。");
			alert("新規登録が完了しました。");
		});
		req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		var e = {
			"user[name]": $('#user_name').val(),
			"user[password]": $('#user_password').val(),
		  "user[password_confirmation]": $('#user_password_confirmation').val()
		}
		req.send(http_test.EncodeHTMLForm( e ));
	}

	http_test.get_users_list = function(path,method){
		http_test.request(path,method,function(results){
			var result_html = "<ul>"
			results.forEach(function(result){
				result_html += "<li>" + result.name + "</li>";
			});
			result_html += "</ul>";
			$("#users_list").html(result_html);
		});
		req.send();
	}

	http_test.logout = function(path,method){
		http_test.request(path,method,function(results){
			var result_html = "ユーザーのリストを表示するには、ボタンを押してください。<br />";
			result_html += "ログインされている必要があります。";
			$("#users_list").html(result_html);
			alert("ログアウトしました。");
		});
		req.send();
	}

})();
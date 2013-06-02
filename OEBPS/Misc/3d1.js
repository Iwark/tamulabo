window.onload = function(){
    var box = document.getElementById("stepWrap");
    var check = document.getElementById("rolling");
    <!--box.className = "animation";-->
    
    check.onclick = function(){
	var nowClass = box.className;
    	box.className = nowClass + " rolling";
    	box.addEventListener("animationend", endFunc, false);
		box.addEventListener("webkitAnimationEnd", endFunc, false);
    };
    
    function endFunc(){
    	box.className = box.className.replace(" rolling", "");
    }
};
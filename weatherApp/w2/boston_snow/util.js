function switchToSecond(e){
	$("#defaultCanvas0").fadeOut();
	var selectDay = 0;
	for(var i = 1; i < 8; i++){
		$("#button" + i).fadeOut();
		if(e.target.id != "button"+i){
			buttonOn[i-1] = 0;
		}else{
			buttonOn[i-1] = 1;
			selectDay = i-1;
		}
	}

	// $("#temp1").css({"top": $(e.target).position.top, "left": $(e.target).position.left, "display" : "block", "opacity":0});
	// $("#temp1").animate({
	// 	top : 0,
	// 	left: 0,
	// 	width : $(window).width(),
	// 	height : $(window).height()/5, 
	// 	background : "rgb("+weatherColor[0][0][0]+", "+weatherColor[0][0][1]+", "+weatherColor[0][0][2]+")",
	// 	opacity: 1
	// })
	// $("#temp2").css({"top": $(e.target).position.top+buttonHeight/5, "left": $(e.target).position.left, "display" : "block", "opacity":0});
	// $("#temp2").animate({
	// 	top : $(window).height()/5,
	// 	left: 0,
	// 	width : $(window).width(),
	// 	height : $(window).height()*3/10, 
	// 	background : "rgb("+weatherColor[0][1][0]+", "+weatherColor[0][1][1]+", "+weatherColor[0][1][2]+")",
	// 	opacity: 1
	// })
	// $("#temp3").css({"top": $(e.target).position.top+buttonHeight/2, "left": $(e.target).position.left, "display" : "block", "opacity":0});
	// $("#temp3").animate({
	// 	top : $(window).height()/2,
	// 	left: 0,
	// 	width : $(window).width(),
	// 	height : $(window).height()/5, 
	// 	background : "rgb("+weatherColor[0][2][0]+", "+weatherColor[0][2][1]+", "+weatherColor[0][2][2]+")",
	// 	opacity: 1
	// })
	// $("#temp4").css({"top": $(e.target).position.top+buttonHeight*7/10, "left": $(e.target).position.left, "display" : "block", "opacity":0});
	// $("#temp4").animate({
	// 	top : $(window).height()*7/10,
	// 	left: 0,
	// 	width : $(window).width(),
	// 	height : $(window).height()*3/10, 
	// 	background : "rgb("+weatherColor[0][3][0]+", "+weatherColor[0][3][1]+", "+weatherColor[0][3][2]+")",
	// 	opacity: 1
	// })
	$("#secondViewContainer").css({"top": $(e.target).position.top+buttonHeight*7/10, "left": $(e.target).position.left, "display" : "block", "opacity":0});
	$("#secondViewContainer").animate({
		top : 0,
		left: 0,
		width : $(window).width(),
		height : $(window).height(), 
		opacity: 1
	});
	var minTTimeP = parseInt(100*(weather.daily.data[selectDay].temperatureMinTime - weather.daily.data[selectDay].time)/(24*60*60));
	var maxTTimeP = parseInt(100*(weather.daily.data[selectDay].temperatureMaxTime - weather.daily.data[selectDay].time)/(24*60*60));
	var minColor = "rgb("+weatherColor[weatherIndex][0][0]+","+weatherColor[weatherIndex][0][1]+","+weatherColor[weatherIndex][0][2]+")";
	var maxColor = "rgb("+weatherColor[weatherIndex][3][0]+","+weatherColor[weatherIndex][3][1]+","+weatherColor[weatherIndex][3][2]+")";
	var bg_color;
	if(weather.daily.data[selectDay].temperatureMinTime < weather.daily.data[selectDay].temperatureMaxTime){
		bg_color = "linear-gradient(to top, "+
		maxColor+" -20%," + 
		minColor+" "+minTTimeP+"%,"+
		maxColor+" "+maxTTimeP+"%,"+
		minColor+" 120%)"
	}else{
		bg_color = "linear-gradient(to top, "+
		minColor+" -20%," + 
		maxColor+" "+maxTTimeP+"%,"+
		minColor+" "+minTTimeP+"%,"+
		maxColor+" 120%)"
	}
	console.log(bg_color);
	$("#secondViewContainer").css("background-image", bg_color);
	$("#secondViewContainer").html("<img src='img/clothes/"+weatherIndex+".png' style='width:100%; margin-top:100px;' />");
}

function measureTxtWidth(txtSize, txt){
	var canvas = document.getElementById("defaultCanvas0");
	var ctx=canvas.getContext("2d");
	ctx.font=txtSize+" Arial";
	return ctx.measureText(txt).width/zoom;
}

function gradientFill(p1, p2, p3, p4, c1, c2){
	var canvas = document.getElementById("defaultCanvas0");
	var ctx=canvas.getContext("2d");
	var gradient = ctx.createLinearGradient(p1, p2, p3, p4);
	gradient.addColorStop(0, c1);
	gradient.addColorStop(1, c2);
	ctx.fillStyle = gradient;
}
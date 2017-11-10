var secondViewContainer;
var ww, wh;
var zoom = 2;
var counter = 0;
var startSecond;
var cloud1StartX, cloud1StartY, cloud1Direc,
	cloud2StartX, cloud2StartY, cloud2Direc,
	cloud3StartX, cloud3StartY, cloud3Direc,
	cloud4StartX, cloud4StartY, cloud4Direc,
	cloud5StartX, cloud5StartY, cloud5Direc,
	cloud6StartX, cloud6StartY, cloud6Direc,
	cloud7StartX, cloud7StartY, cloud7Direc;

var weeklyWeather = new Array();
function preload() {
	// var url = 'https://api.darksky.net/forecast/4ed3e043bd39de9fd1b75332d6cd8b39/42.3601,-71.0589';
	// weather = loadJSON(url);
	weather = loadJSON("data/test.json");
	console.log(weather);
	// console.log(new Date().getTime()/1000-12*3600);
	// var currentTime = new Date().getTime()/1000-12*3600;
	// var startTime = currentTime - 2*24*60*60;
	// for(var i = 0; i < 12; i++){
	// 	var url = 'https://api.darksky.net/forecast/4ed3e043bd39de9fd1b75332d6cd8b39/42.3601,-71.0589,'+(startTime*i*24*60*60);
	// 	weeklyWeather[i] = loadJSON(url);
	// }
}

function setup() {
	var date = new Date(weather.currently.time*1000+12*3600*1000);
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() + ':';
	s = date.getSeconds(); 
	console.log(Y+M+D+h+m+s);

	ww = windowWidth;
	wh = windowHeight;
	
	createCanvas(ww, wh);

	cloud1StartX = ww*0.75*zoom; cloud1StartY = wh*0.16*zoom; cloud1Direc = random() >= 0.5 ? true : false;
	cloud2StartX = ww*0.15*zoom; cloud2StartY = wh*0.12*zoom; cloud2Direc = random() >= 0.5 ? true : false;
	cloud3StartX = ww*0.1*zoom; cloud3StartY = wh*0.36*zoom; cloud3Direc = random() >= 0.5 ? true : false;
	cloud4StartX = ww*0.83*zoom; cloud4StartY = wh*0.34*zoom; cloud4Direc = random() >= 0.5 ? true : false;
	cloud5StartX = ww*0.35*zoom; cloud5StartY = wh*0.3*zoom; cloud5Direc = random() >= 0.5 ? true : false;
	cloud6StartX = ww*0.55*zoom; cloud6StartY = wh*0.5*zoom; cloud6Direc = random() >= 0.5 ? true : false;
	cloud7StartX = ww*0.75*zoom; cloud7StartY = wh*0.63*zoom; cloud7Direc = random() >= 0.5 ? true : false;

	initRain();
	initSnow();

	//add buttons
	if(weather.currently.icon == "clear-day" || weather.currently.icon == "partly-cloudy-night" || weather.currently.icon == "clear-night"){
		weatherIndex = 0;
	}else if(weather.currently.icon == "snow"){
		weatherIndex = 1;
	}else if(weather.currently.icon == "rain"){
		weatherIndex = 2;
	}
	

	button1 = createElement("div");
	button1.position(0, wh-300);
	button1.id("button1");
	button1.size(ww/7, 300);
	button1.mouseClicked(switchToSecond);
	button2 = createElement("div");
	button2.position(ww/7, wh-300);
	button2.id("button2");
	button2.size(ww/7, 300);
	button2.mouseClicked(switchToSecond);
	button3 = createElement("div");
	button3.position(2*ww/7, wh-300);
	button3.id("button3");
	button3.size(ww/7, 300);
	button3.mouseClicked(switchToSecond);
	button4 = createElement("div");
	button4.position(3*ww/7, wh-300);
	button4.id("button4");
	button4.size(ww/7, 300);
	button4.mouseClicked(switchToSecond);
	button5 = createElement("div");
	button5.position(4*ww/7, wh-300);
	button5.id("button5");
	button5.size(ww/7, 300);
	button5.mouseClicked(switchToSecond);
	button6 = createElement("div");
	button6.position(5*ww/7, wh-300);
	button6.id("button6");
	button6.size(ww/7, 300);
	button6.mouseClicked(switchToSecond);
	button7 = createElement("div");
	button7.position(6*ww/7, wh-300);
	button7.id("button7");
	button7.size(ww/7, 300);
	button7.mouseClicked(switchToSecond);

	secondViewContainer = createElement("div");
	secondViewContainer.id("secondViewContainer");
	secondViewContainer.size(ww, buttonHeight*3/10);
	secondViewContainer.position(0, 0);
	secondViewContainer.style("display", "none");
	secondViewContainer.style("background", "#00f");
} 

function imageSmoothing(){
	var canvas = document.getElementById("defaultCanvas0");
	canvas.width = ww*zoom;
	canvas.height = wh*zoom;
	canvas.style.width = ww+"px";
	canvas.style.height = wh+"px";
}

function draw() { 
	imageSmoothing();
	background(bgColorRGB[weatherIndex][0],bgColorRGB[weatherIndex][1],bgColorRGB[weatherIndex][2]);

	//draw the weather animation on the top
	if(weatherIndex == 0){
		sunnyAnimation();
	}else if(weatherIndex == 1){
		snowyAnimation();
	}else if(weatherIndex == 2){
		rainyAnimation();
	}

	//write stuffs for the first view
	noStroke();
	fill(50);
	textSize(160);
	text("Boston", ww*zoom/2-measureTxtWidth(160, "Boston"), wh*zoom*0.1);
	textSize(80);
	fill(125)
	text(weather.currently.icon, ww*zoom/2-measureTxtWidth(80, weather.currently.icon), wh*zoom*0.135);
	textSize(60);
	fill(150);
	var date = new Date(weather.currently.time*1000+12*3600*1000);
	var hh = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
	var mm = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
	text(hh+":"+mm, ww*zoom/2-measureTxtWidth(60, hh+":"+mm), wh*zoom*0.165);

	//legend above buttons
	//min max and current temperature labels
	var minTemperatureWeek = 1000;
	var maxTemperatureWeek = -1000;
	for(var i = 0, len = weather.daily.data.length-1; i < len; i++){
		if(weather.daily.data[i].temperatureMin < minTemperatureWeek){
			minTemperatureWeek = weather.daily.data[i].temperatureMin;
		}
		if(weather.daily.data[i].temperatureMax > maxTemperatureWeek){
			maxTemperatureWeek = weather.daily.data[i].temperatureMax;
		}
	}
	currentTemperaturePosiX = (weather.currently.temperature - minTemperatureWeek)/(maxTemperatureWeek - minTemperatureWeek) * ww*zoom*2/3 + ww*zoom/6;
	textSize(45);
	text(minTemperatureWeek, ww*zoom/6-measureTxtWidth(45, minTemperatureWeek)*2-30, wh*zoom*0.77+30);
	text(maxTemperatureWeek, ww*zoom*5/6+30, wh*zoom*0.77 + 30);
	textSize(60);
	text(weather.currently.temperature, currentTemperaturePosiX-measureTxtWidth(60, weather.currently.temperature), wh*zoom*0.77+120);
	//the legend bar itself
	gradientFill(ww*zoom/6, 0, ww*zoom*5/6, 0, 
		"rgb("+buttonColor[weatherIndex][0][0]+","+buttonColor[weatherIndex][0][1]+","+buttonColor[weatherIndex][0][2]+")", 
		"rgb("+buttonColor[weatherIndex][6][0]+","+buttonColor[weatherIndex][6][1]+","+buttonColor[weatherIndex][6][2]+")");
	rect(ww*zoom/6, wh*zoom*0.77, ww*zoom*2/3, 30);
	fill(buttonColor[weatherIndex][0][0], buttonColor[weatherIndex][0][1], buttonColor[weatherIndex][0][2]);
	ellipse(ww*zoom/6, wh*zoom*0.77+15, 30);
	fill(buttonColor[weatherIndex][6][0], buttonColor[weatherIndex][6][1], buttonColor[weatherIndex][6][2]);
	ellipse(ww*zoom*5/6, wh*zoom*0.77+15, 30);
	stroke(bgColorRGB[weatherIndex][0],bgColorRGB[weatherIndex][1],bgColorRGB[weatherIndex][2]);
	strokeWeight(8);
	//fill color of the slider
	var percentage = (weather.currently.temperature - minTemperatureWeek)/(maxTemperatureWeek - minTemperatureWeek);
	var sliderR = percentage*(buttonColor[weatherIndex][6][0] - buttonColor[weatherIndex][0][0]) + buttonColor[weatherIndex][0][0];
	var sliderG = percentage*(buttonColor[weatherIndex][6][1] - buttonColor[weatherIndex][0][1]) + buttonColor[weatherIndex][0][1];
	var sliderB = percentage*(buttonColor[weatherIndex][6][2] - buttonColor[weatherIndex][0][2]) + buttonColor[weatherIndex][0][2];
	fill(sliderR, sliderG, sliderB);
	ellipse(currentTemperaturePosiX, wh*zoom*0.77+15, 60);

	//draw bottons on the bottom
	var tempWeekly = new Array();
	for(var i = 0, len = weather.daily.data.length-1; i < len; i++){
		tempWeekly.push((weather.daily.data[i].temperatureHigh + weather.daily.data[i].temperatureLow ) /2);
	}
	tempWeekly = tempWeekly.sort();
	for(var i = 0, len = weather.daily.data.length-1; i < len; i++){
		noStroke();
		var colorIndex = tempWeekly.indexOf((weather.daily.data[i].temperatureHigh + weather.daily.data[i].temperatureLow ) /2);
		fill(buttonColor[weatherIndex][colorIndex][0], buttonColor[weatherIndex][colorIndex][1], buttonColor[weatherIndex][colorIndex][2]);
		rect(i*ww*zoom/7, wh*zoom-600, ww*zoom/7, 600);
	}

	//boxplot on the button
	for(var i = 0, len = weather.daily.data.length-1; i < len; i++){
		var tmpMin = weather.daily.data[i].temperatureMin;
		var tmpMax = weather.daily.data[i].temperatureMax;
		var percentageMin = (tmpMin-minTemperatureWeek)/(maxTemperatureWeek-minTemperatureWeek);
		var percentageMax = (tmpMax-minTemperatureWeek)/(maxTemperatureWeek-minTemperatureWeek);

		//position of the box
		var displayHeight = 600-2*ww*zoom/21;
		var boxHeight = displayHeight*(tmpMax-tmpMin)/(maxTemperatureWeek-minTemperatureWeek);
		var boxY = wh*zoom-ww*zoom/21 - percentageMax*displayHeight;
		
		var minR = parseInt(percentageMin*(buttonColor[weatherIndex][6][0] - buttonColor[weatherIndex][0][0]) + buttonColor[weatherIndex][0][0]);
		var minG = parseInt(percentageMin*(buttonColor[weatherIndex][6][1] - buttonColor[weatherIndex][0][1]) + buttonColor[weatherIndex][0][1]);
		var minB = parseInt(percentageMin*(buttonColor[weatherIndex][6][2] - buttonColor[weatherIndex][0][2]) + buttonColor[weatherIndex][0][2]);
		var maxR = parseInt(percentageMax*(buttonColor[weatherIndex][6][0] - buttonColor[weatherIndex][0][0]) + buttonColor[weatherIndex][0][0]);
		var maxG = parseInt(percentageMax*(buttonColor[weatherIndex][6][1] - buttonColor[weatherIndex][0][1]) + buttonColor[weatherIndex][0][1]);
		var maxB = parseInt(percentageMax*(buttonColor[weatherIndex][6][2] - buttonColor[weatherIndex][0][2]) + buttonColor[weatherIndex][0][2]);
		gradientFill(0, boxY, 0, boxY+displayHeight, 
		"rgb("+minR+","+minG+","+minB+")", 
		"rgb("+maxR+","+maxG+","+maxB+")");
		rect(ww*zoom/21*(3*i+1), boxY, ww*zoom/21, displayHeight);
	}

	counter++;
}

/**************** sunny animation *********************/
function sunnyAnimation(){
	var sunCenterX = ww*0.55*zoom;
	var sunCenterY = wh*0.35*zoom;
	var sunR = ww*zoom/7;
	drawSun(sunCenterX, sunCenterY, sunR);
	drawCloud(cloud1Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud1StartY, ww*zoom*0.66/3, cloud1Direc, 9);
	drawCloud(cloud2Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud2StartY, ww*zoom*0.66/3, cloud2Direc, 6);
	drawCloud(cloud3Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud3StartY, ww*zoom/6, cloud3Direc, 7);
	drawCloud(cloud4Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud4StartY, ww*zoom/4, cloud4Direc, 10);
	drawCloud(cloud5Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud5StartY, ww*zoom/4, cloud5Direc, 11);
	drawCloud(cloud6Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud6StartY, ww*zoom/6, cloud6Direc, 8);
	drawCloud(cloud7Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud7StartY, ww*zoom/3, cloud7Direc, 15);
}

function drawSun(cx, cy, sr){
	fill(255, 245, 151);
	stroke(255, 245, 151);
	strokeWeight(30);
	strokeCap(ROUND);
	ellipse(cx, cy, sr);
	for(var i = 0; i < 8; i++){
		var cosVal = cos((counter+i*450)%3600*0.1*PI/180);
		var sinVal = sin((counter+i*450)%3600*0.1*PI/180);
		line(cx + 0.85*sr*cosVal, cy + 0.85*sr*sinVal, cx + 1.25*sr*cosVal, cy + 1.25*sr*sinVal);
	}
}

function drawCloud(cx, cy, w, cloudDirec, time){
	var moveX = 1.5*ww*zoom/(time*60);
	var cloudX = cloudDirec ? counter%(time*60)*moveX : -counter%(time*60)*moveX;
	cx = cx+cloudX;

	fill(255);
	noStroke();

	ellipse(cx-w/6, cy, w*0.33);
	ellipse(cx-w/3, cy+w/10, w/5);
	ellipse(cx+w/60, cy+w/15, w*4/15);
	rect(cx-w/3, cy+w/10, w*7/20, w/10);
}

/**************** rainy animation *********************/
function rainyAnimation(){
	stroke(174,194,224,120);
	fill(200, 100);
	strokeWeight(10);
	strokeCap(ROUND);

	for(var c = 0; c < particles.length; c++) {
		var p = particles[c];
		line(p.x, p.y, p.x + p.l * p.xs, p.y + p.l * p.ys);
	}

	for(var b = 0; b < particles.length; b++) {
		var p = particles[b];
		p.x += p.xs;
		p.y += p.ys;
		if(p.x > ww*zoom || p.y > wh*0.65*zoom) {
			p.x = Math.random() * ww * zoom;
			p.y = -20;
		}
	}

	var cloudW = ww*zoom/2;
	var cloudX = ww*zoom/2;
	var cloudY = wh*zoom*0.35;
	fill(255);
	noStroke();
	ellipse(cloudX-cloudW/6, cloudY, cloudW*0.33);
	ellipse(cloudX-cloudW/3, cloudY+cloudW/10, cloudW/5);
	ellipse(cloudX+cloudW/60, cloudY+cloudW/15, cloudW*4/15);
	rect(cloudX-cloudW/3, cloudY+cloudW/10, cloudW*7/20, cloudW/10);
}

function initRain(){
	init = [];
	maxParts = 300;
	for(var a = 0; a < maxParts; a++) {
		init.push({
			x: Math.random() * ww*zoom,
			y: Math.random() * wh*0.65*zoom,
			l: Math.random() * 3,
			xs: -4 + Math.random() * 4 + 2,
			ys: Math.random() * 30 + 30
		})
	}
	particles = [];
	for(var b = 0; b < maxParts; b++) {
		particles[b] = init[b];
	}
}

/**************** snowy animation *********************/
function snowyAnimation(){
	var opacity = Math.random()*90;
	stroke(174,194,224,opacity);
	// fill(255);
	// stroke(255);
	fill(200, 100);
	strokeWeight(10);
	strokeCap(ROUND);


	for(var c = 0; c < particles.length; c++) {
		var p = particles[c];

		ellipse(p.x, p.y, p.r);
	}

	for(var b = 0; b < particles.length; b++) {
		var p = particles[b];
		p.x += p.xs;
		p.y += p.ys;
		if(p.x > ww*zoom || p.y > wh*0.65*zoom) {
			p.x = Math.random() * ww * zoom;
			p.y = -5;
		}
	}

	var cloudW = ww*zoom*0.5;
	var cloudX = ww*zoom/2;
	var cloudY = wh*zoom*0.35;
	fill(255);
	noStroke();
	ellipse(cloudX-cloudW/6, cloudY, cloudW*0.33);
	ellipse(cloudX-cloudW/3, cloudY+cloudW/10, cloudW/5);
	ellipse(cloudX+cloudW/60, cloudY+cloudW/15, cloudW*4/15);
	rect(cloudX-cloudW/3, cloudY+cloudW/10, cloudW*7/20, cloudW/10);

	fill(255, 50);
	ellipse(cloudX, cloudY+cloudW/4, cloudW/15);
	ellipse(cloudX-cloudW/8, cloudY+0.3*cloudW, cloudW/12);
	ellipse(cloudX-cloudW/4, cloudY+cloudW/4, cloudW/15);
	fill(255, 100);
	ellipse(cloudX, cloudY+cloudW/4, cloudW/30);
	ellipse(cloudX-cloudW/8, cloudY+0.3*cloudW, cloudW/24);
	ellipse(cloudX-cloudW/4, cloudY+cloudW/4, cloudW/30);
	
}

function initSnow(){
	init = [];
	maxParts = 300;
	for(var a = 0; a < maxParts; a++) {
		init.push({
			x: Math.random() * ww*zoom,
			y: Math.random() * wh*0.65*zoom,
			r: Math.random() * 10 + 5,
			xs: -2 + Math.random() * 2 + 1,
			ys: Math.random() * 3 + 3
		})
	}
	particles = [];
	for(var b = 0; b < maxParts; b++) {
		particles[b] = init[b];
	}
}
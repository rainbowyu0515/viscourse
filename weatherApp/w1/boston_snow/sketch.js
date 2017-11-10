var cover1, cover2;
var ww, wh;
var zoom = 2;
var counter = 0;
var startSecond;
var cloud1StartX, cloud1StartY, cloud1Direc,
	cloud2StartX, cloud2StartY, cloud2Direc,
	cloud3StartX, cloud3StartY, cloud3Direc,
	cloud4StartX, cloud4StartY, cloud4Direc,
	cloud5StartX, cloud5StartY, cloud5Direc;

var init, particles, maxParts = 300;

var greetings = new Array("It is a fine day to hang out!",
				"Rainy day, but there is sunshine in your heart.",
				"It's snowing outside, is your snowman better than mine");

var weatherOption = new Array("clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night");

function imageSmoothing(){
	var canvas = document.getElementById("defaultCanvas0");
	// canvas.getContext('2d').imageSmoothingEnabled = true;
	canvas.width = ww*zoom;
	canvas.height = wh*zoom;
	canvas.style.width = ww+"px";
	canvas.style.height = wh+"px";
}

var weather;
function preload() {
	// var url = 'https://api.darksky.net/forecast/4ed3e043bd39de9fd1b75332d6cd8b39/42.3601,-71.0589';
	// weather = loadJSON(url);
	weather = loadJSON("data/test.json");
	
}

function setup() {
	//judge which weather it is now
	switch(weather.currently.icon){
		case "clear-day":
			break;

	}

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
	cover1 = createElement("div");
	cover1.position(0, 0);
	cover1.class("cover1");
	cover1.id("cover1");

	cover2 = createElement("div");
	cover2.position(0, wh*0.41);
	cover2.class("cover2");
	cover2.id("cover2");

	createCanvas(ww, wh);

	cloud1StartX = ww*0.75*zoom; cloud1StartY = wh*0.16*zoom; cloud1Direc = random() >= 0.5 ? true : false;
	cloud2StartX = ww*0.15*zoom; cloud2StartY = wh*0.12*zoom; cloud2Direc = random() >= 0.5 ? true : false;
	cloud3StartX = ww*0.1*zoom; cloud3StartY = wh*0.36*zoom; cloud3Direc = random() >= 0.5 ? true : false;
	cloud4StartX = ww*0.83*zoom; cloud4StartY = wh*0.34*zoom; cloud4Direc = random() >= 0.5 ? true : false;
	cloud5StartX = ww*0.35*zoom; cloud5StartY = wh*0.3*zoom; cloud5Direc = random() >= 0.5 ? true : false;

	initRain();
	initSnow();

} 

function draw() { 
	imageSmoothing();
	background(220, 0.5);

	//draw the weather animation on the top
	 // sunnyAnimation();
	 snowyAnimation();
	//rainyAnimation();

	//write stuffs for the first view
	fill(255);
	noStroke();
	textSize(60*zoom);
	text("Boston", 20*zoom, wh*zoom*0.45);
	textSize(139*zoom);
	text(weather.currently.temperature, 15*zoom, wh*zoom*0.54);
	fill(150);
	textSize(30*zoom);
	text(greetings[2], 20*zoom, wh*zoom*0.57);
	fill(255);
	text("Humidity", 20*zoom, wh*zoom*0.62);
	text("Wind Speed", 20*zoom+ww*zoom/5, wh*zoom*0.62);
	text("Visibility", 20*zoom+2*ww*zoom/5+80, wh*zoom*0.62);
	text("Weather", 20*zoom+3*ww*zoom/5+70, wh*zoom*0.62);
	textSize(45*zoom);
	text(weather.currently.humidity, 30*zoom, wh*zoom*0.66);
	text(weather.currently.windSpeed, 30*zoom+ww*zoom/5+60, wh*zoom*0.66);
	text(weather.currently.visibility, 30*zoom+2*ww*zoom/5+80, wh*zoom*0.66);
	text("Snowy", 30*zoom+3*ww*zoom/5+40, wh*zoom*0.66);
	fill(200);
	textSize(30*zoom);
	text("Hourly forcast of Boston", 20*zoom, wh*zoom*0.75);

	//draw temperature curve 
	drawTempCurve(weather.hourly.data);
	counter++;
}

/**************** InitWeatherTheme *********************/
function initWeather(){
	// var bg = document.
}

/**************** Draw temperature curve *********************/
function drawTempCurve(hourlyTemp){
	var minTemp = 10000, maxTemp = -10000;
	var minTempY = wh*zoom*0.95;
	var maxTempY = wh*zoom*0.8;
	var offsetX = ww*zoom/6;
	for(var i = 0, len = hourlyTemp.length; i < len; i++){
		if(hourlyTemp[i].temperature < minTemp){
			minTemp = hourlyTemp[i].temperature;
		}
		if(hourlyTemp[i].temperature > maxTemp){
			maxTemp = hourlyTemp[i].temperature;
		}
	}

	var lastPosiX = 0, lastPosiY = 0;
	for(var i = 0, len = hourlyTemp.length; i < len; i++){
		var ellipseY = maxTempY+(minTempY-maxTempY)*(maxTemp - hourlyTemp[i].temperature)/(maxTemp-minTemp);
		noStroke();
		fill(255, 10);
		ellipse(i*offsetX, ellipseY, 60);
		fill(255, 20);
		ellipse(i*offsetX, ellipseY, 52);
		fill(255, 30);
		ellipse(i*offsetX, ellipseY, 44);
		fill(255, 40);
		ellipse(i*offsetX, ellipseY, 36);
		fill(255, 50);
		ellipse(i*offsetX, ellipseY, 28);
		fill(255, 90);
		ellipse(i*offsetX, ellipseY, 23);
		//drawCurve
		if(!(lastPosiX == 0 && lastPosiY == 0)){
			stroke(255, 20);
			strokeWeight(20);
			line(lastPosiX, lastPosiY, i*offsetX, ellipseY);
			stroke(255, 70);
			strokeWeight(12);
			line(lastPosiX, lastPosiY, i*offsetX, ellipseY);
		}
		lastPosiX = i*offsetX;
		lastPosiY = ellipseY;
	}
}	

/**************** sunny animation *********************/
function sunnyAnimation(){
	var sunCenterX = ww*0.55*zoom;
	var sunCenterY = wh*0.23*zoom;
	var sunR = ww*zoom/14;
	drawSun(sunCenterX, sunCenterY, sunR);
	drawCloud(cloud1Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud1StartY, ww*zoom*0.66/3, cloud1Direc, 9);
	drawCloud(cloud2Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud2StartY, ww*zoom*0.66/3, cloud2Direc, 6);
	drawCloud(cloud3Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud3StartY, ww*zoom/6, cloud3Direc, 7);
	drawCloud(cloud4Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud4StartY, ww*zoom/4, cloud4Direc, 10);
	drawCloud(cloud5Direc?-0.5*ww*zoom:1.5*ww*zoom, cloud5StartY, ww*zoom/4, cloud5Direc, 11);
}

function drawSun(cx, cy, sr){
	noFill();
	stroke(255);
	strokeWeight(20);
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
	fill(255);
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
		if(p.x > ww*zoom || p.y > wh*0.35*zoom) {
			p.x = Math.random() * ww * zoom;
			p.y = -20;
		}
	}

	var cloudW = ww*zoom/5;
	var cloudX = ww*zoom/2;
	var cloudY = wh*zoom/10;
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
			y: Math.random() * wh*0.35*zoom,
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

/**************** rainy animation *********************/
function snowyAnimation(){
	var opacity = Math.random()*90;
	stroke(174,194,224,opacity);
	// fill(255);
	// stroke(255);
	fill(255);
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
		if(p.x > ww*zoom || p.y > wh*0.35*zoom) {
			p.x = Math.random() * ww * zoom;
			p.y = -5;
		}
	}

	var cloudW = ww*zoom*0.5;
	var cloudX = ww*zoom/2;
	var cloudY = wh*zoom/7;
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
			y: Math.random() * wh*0.35*zoom,
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
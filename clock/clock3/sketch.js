var cx, cy;

var axieLength = 400;
var longTickLength = 10;
var shortTickLength = 6;

function setup(){
	createCanvas(1024, 768);var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	cx = width/2;
	cy = height/2 + 100;
}

function draw(){
	background(255);
	
	//draw time triangle
	var h = hour();
	var m = minute();
	var s = second();
	var hx = cx;
	var hy = cy-h/24*axieLength;
	var mx = cx-m/60*axieLength/2*sqrt(3);
	var my = cy+m/60*axieLength/2;
	var sx = cx+s/60*axieLength/2*sqrt(3);
	var sy = cy+s/60*axieLength/2;
	fill(237);
	stroke(150);
	strokeWeight(1);
	triangle(hx, hy, mx, my, sx, sy);
	
	//draw axies
	stroke(100);
	strokeWeight(2);
	fill(100);
	line(cx, cy, cx, cy - axieLength);
	line(cx, cy, cx - axieLength/2*sqrt(3), cy + axieLength/2);
	line(cx, cy, cx + axieLength/2*sqrt(3), cy + axieLength/2);
	//draw long ticks
	var centerX1 = cx - axieLength/2*sqrt(3);
	var centerY1 = cy + axieLength/2;
	var startX1 = centerX1 + longTickLength/4*sqrt(3);
	var startY1 = centerY1 + longTickLength/2;
	var startX2 = centerX1 - longTickLength/4*sqrt(3);
	var startY2 = centerY1 - longTickLength/2;
	
	var centerX2 = cx + axieLength/2*sqrt(3);
	var centerY2 = cy + axieLength/2;
	var startX3 = centerX2 - longTickLength/4*sqrt(3);
	var startY3 = centerY2 + longTickLength/2;
	var startX4 = centerX2 + longTickLength/4*sqrt(3);
	var startY4 = centerY2 - longTickLength/2;
	for(var i = 0; i < 12; i++){
		stroke(100);
		strokeWeight(2);
		line(startX1+i*axieLength/24*sqrt(3), startY1-i*axieLength/24, startX2+i*axieLength/24*sqrt(3), startY2-i*axieLength/24);
		line(startX3-i*axieLength/24*sqrt(3), startY3-i*axieLength/24, startX4-i*axieLength/24*sqrt(3), startY4-i*axieLength/24);
		line(cx-longTickLength/2, cy-axieLength+i*axieLength/12, cx+longTickLength/2, cy-axieLength+i*axieLength/12);
		
		//write tick numbers
		noStroke();
		textSize(15);
		text(60-i*5, startX2+i*axieLength/24*sqrt(3)-20, startY2-i*axieLength/24-5);
		text(60-i*5, startX4-i*axieLength/24*sqrt(3)+10, startY4-i*axieLength/24-5);
		text(24-i*2, cx+longTickLength/2+3, cy-axieLength+i*axieLength/12+5);
	}
	//draw short ticks
	stroke(100);
	strokeWeight(2);
	var startX5 = centerX1 + shortTickLength/4*sqrt(3);
	var startY5 = centerY1 + shortTickLength/2;
	var startX6 = centerX1 - shortTickLength/4*sqrt(3);
	var startY6 = centerY1 - shortTickLength/2;
	
	var startX7 = centerX2 - shortTickLength/4*sqrt(3);
	var startY7 = centerY2 + shortTickLength/2;
	var startX8 = centerX2 + shortTickLength/4*sqrt(3);
	var startY8 = centerY2 - shortTickLength/2;
	for(var i = 0; i < 60; i++){
		stroke(100);
		strokeWeight(1);
		line(startX5+i*axieLength/120*sqrt(3), startY5-i*axieLength/120, startX6+i*axieLength/120*sqrt(3), startY6-i*axieLength/120);
		line(startX7-i*axieLength/120*sqrt(3), startY7-i*axieLength/120, startX8-i*axieLength/120*sqrt(3), startY8-i*axieLength/120);
	}
	
	//write axie name
	textSize(20);
	stroke(50);
	fill(50);
	text("M", centerX1-40, centerY1+20);
	text("S", centerX2+15, centerY2+20);
	text("H", cx-8, cy-axieLength-20);
}
var cx, cy;
var blockW = 80;
var blockH = 80;

var hourFontSize = 28;
var minFontSize = 24;
var secFontSize = 20;

function setup() { 
  createCanvas(1024, 768);
  document.getElementById("defaultCanvas0").className = "shadow";
 var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
  cx = width / 2;
  cy = height / 2;
} 

function draw() { 
  	background(229, 247, 255);	
	//calculate x and y position of hour, minute and second
	var sx = second()%10*blockW+cx-blockW*5 + 4;
	var sy = blockH*6-floor(second()/10)*blockH+cy-blockH*3 - 2;
	var mx = minute()%10*blockW+cx-blockW*5 + 2;
	var my = blockH*6-floor(minute()/10)*blockH+cy-blockH*3 - 1;
	var hx = hour()%10*blockW+cx-blockW*5;
	var hy = blockH*6-floor(hour()/10)*blockH+cy-blockH*3;
	
	var hxoff = hour() >= 10 ? hourFontSize/2 + 2 : 7;
	var mxoff = minute() >= 10 ? minFontSize/2 + 2 : 6;
	var sxoff = second() >= 10 ? secFontSize/2 + 2 : 5;
	
	var hyoff = 10;
	var myoff = 8;
	var syoff = 7;
	
	//draw lines
	stroke(200);
	strokeWeight(2);
	line(hx+hxoff, hy-hyoff, mx+mxoff, my-myoff);
	line(sx+sxoff, sy-syoff, mx+mxoff, my-myoff);
	
	//draw ellipses and write text
	//hour
  	strokeWeight(2);
	fill(229, 247, 255);
	stroke(50);
	ellipse(hx+hxoff, hy-hyoff, 50);
	
	noStroke();
	fill(50);
	textSize(hourFontSize);
	text(hour(), hx, hy);
	
	//minute
	stroke(150);
	strokeWeight(2);
	fill(229, 247, 255);
	ellipse(mx+mxoff, my-myoff, 45);
	
	noStroke();
	fill(100);
	textSize(minFontSize);
	text(minute(), mx, my);
	
	//second
	stroke(200);
	strokeWeight(2);
	fill(229, 247, 255);
	ellipse(sx+sxoff, sy-syoff, 40);
	
	noStroke();
	fill(150);
	textSize(secFontSize);
	text(second(), sx, sy);
	
	//legend
	strokeWeight(2);
	fill(229, 247, 255);
	stroke(50);
	ellipse(cx-120, height-47, 45);
	stroke(150);
	ellipse(cx, height-47, 40);
	stroke(200);
	ellipse(cx+120, height-47, 35);
  
	textSize(20);
	noStroke();
	fill(50);
	text("H", cx-90, height-40);
	fill(100);
	text("M", cx+27, height-40);
	fill(150);
	text("S", cx+145, height-40);
}
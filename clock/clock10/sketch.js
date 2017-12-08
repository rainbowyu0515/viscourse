var cx, cy;

var r1 = 400;
var r2 = 500;
var r3 = 600;

var hr = 50;
var mr = 35;
var sr = 20;

function dashStroke(d1, d2){
	var canvas = document.getElementById("defaultCanvas0");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([d1, d2]);
}

function setup(){
	createCanvas(1024, 768);var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	cx = width/2;
	cy = height/2;
}

function draw(){
	background(255);
	
	//draw tracks
	stroke(150);
	dashStroke(5, 5);
	strokeWeight(1);
	fill(255, 0);
	
	ellipse(cx, cy-50, r1);
	ellipse(cx, cy-50, r2);
	ellipse(cx, cy-50, r3);
	
	//draw time circles
	var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI; 
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
	noStroke();
	fill(233, 245, 252);
	ellipse(cx + cos(h) * r1/2, cy - 50 + sin(h) * r1/2, hr);
	fill(196, 223, 233);
	ellipse(cx + cos(m) * r2/2, cy - 50 + sin(m) * r2/2, mr);
	fill(140, 186, 197);
	ellipse(cx + cos(s) * r3/2, cy - 50 + sin(s) * r3/2, sr);
	
	//legend
	fill(233, 245, 252);
	ellipse(cx - 120, height - 50, hr);
	fill(196, 223, 233);
	ellipse(cx, height - 50, mr);
	fill(140, 186, 197);
	ellipse(cx + 120, height - 50, sr);
	fill(80);
	textSize(20);
	text("H", cx - 90, height-42);
	text("M", cx + 25, height-42);
	text("S", cx + 135, height-42);
}
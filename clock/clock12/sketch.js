var cx, cy;

var r1 = 400;
var r2 = 500;
var r3 = 600;

function setup(){
	createCanvas(1024, 768);var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	cx = width/2;
	cy = height/2;
}

function draw(){
	background(255);
	
	//draw background frames
	//hour
	stroke(200);
	strokeWeight(1);
	fill(255);
	for(var i = 0; i < 12; i++){
		arc(cx, cy-50, r3, r3, i*PI/6, (i+1)*PI/6);
		line(cx, cy-50, cx + cos(i*PI/6) * r3/2, cy - 50 + sin(i*PI/6) * r3/2);
		line(cx, cy-50, cx + cos((i+1)*PI/6) * r3/2, cy - 50 + sin((i+1)*PI/6) * r3/2);
	}
	
	//draw hour block
	var h = hour() >= 12 ? hour()-12 : hour();
	noStroke();
	fill(233, 245, 252);
	arc(cx, cy-50, r3, r3, h*PI/6-HALF_PI, (h+1)*PI/6-HALF_PI);

	//minute
	stroke(200);
	strokeWeight(1);
	fill(255);
	for(var i = 0; i < 60; i++){
		arc(cx, cy-50, r2, r2, i*PI/30, (i+1)*PI/30);
		line(cx, cy-50, cx + cos(i*PI/30) * r2/2, cy - 50 + sin(i*PI/30) * r2/2);
		line(cx, cy-50, cx + cos((i+1)*PI/30) * r2/2, cy - 50 + sin((i+1)*PI/30) * r2/2);
	}
	//draw minute block
	var m = minute();
	noStroke();
	fill(196, 223, 233);
	arc(cx, cy-50, r2, r2, m*PI/30-HALF_PI, (m+1)*PI/30-HALF_PI);
	
	//second	
	stroke(200);
	strokeWeight(1);
	fill(255);
	for(var i = 0; i < 60; i++){
		arc(cx, cy-50, r1, r1, i*PI/30, (i+1)*PI/30);
		line(cx, cy-50, cx + cos(i*PI/30) * r1/2, cy - 50 + sin(i*PI/30) * r1/2);
		line(cx, cy-50, cx + cos((i+1)*PI/30) * r1/2, cy - 50 + sin((i+1)*PI/30) * r1/2);
	}
	//draw second block
	var s = second();
	noStroke();
	fill(140, 186, 197);
	arc(cx, cy-50, r1, r1, s*PI/30-HALF_PI, (s+1)*PI/30-HALF_PI);
	
	//draw an inner circle
	fill(255);
	stroke(200);
	strokeWeight(1);
	ellipse(cx, cy-50, 300);
	
	//legend
	noStroke();
	fill(233, 245, 252);
	arc(cx - 135, height - 50, 60, 60, -PI/6, PI/6);
	fill(196, 223, 233);
	arc(cx, height - 50, 60, 60, -PI/6, PI/6);
	fill(140, 186, 197);
	arc(cx + 135, height - 50, 60, 60, -PI/6, PI/6);
	fill(255);
	arc(cx - 135, height - 50, 30, 30, -PI/3, PI/3);
	arc(cx, height - 50, 30, 30, -PI/3, PI/3);
	arc(cx + 135, height - 50, 30, 30, -PI/3, PI/3);
	fill(80);
	textSize(20);
	text("H", cx - 100, height-42);
	text("M", cx + 35, height-42);
	text("S", cx + 170, height-42);
}
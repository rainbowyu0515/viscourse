var cx, cy;

var hr, mr, sr;

function setup() { 
  createCanvas(1024, 768);
	var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	cx = width/2;
	cy = height/2 - 30;
	hr = 300;
	mr = 250;
	sr = 200;
} 

function draw() { 
  background(255);
	
	noStroke();
	fill(232, 245, 252);
	arc(cx, cy, hr*2, hr*2, -HALF_PI, hour()/12*PI-HALF_PI);
	fill(255);
	ellipse(cx, cy, 2*hr-80);
	
	fill(193, 222, 234);
	arc(cx, cy, mr*2, mr*2, -HALF_PI, minute()/30*PI-HALF_PI);
	fill(255);
	ellipse(cx, cy, 2*mr-80);
	
	fill(135, 185, 198);
	arc(cx, cy, sr*2, sr*2, -HALF_PI, second()/30*PI-HALF_PI);
	fill(255);
	ellipse(cx, cy, 2*sr-80);
	
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
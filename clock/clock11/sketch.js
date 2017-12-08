var cx, cy;
var tickDistance = 360 / 144;
var r = 300;
var longTick = 20;
var shortTick = 10;

function quadraticCurve(x1, y1, x2, y2, x3, y3, lineWidth, strokeColor) {
	var canvas = document.getElementById('defaultCanvas0');var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	var context = canvas.getContext('2d');

	context.beginPath();
	context.moveTo(x1, y1);
	context.quadraticCurveTo(x2, y2, x3, y3);
	context.lineWidth = lineWidth;

	context.strokeStyle = strokeColor;
	context.stroke();
}

function setup() {
	createCanvas(1024, 768);
	var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	cx = width / 2;
	cy = height / 2;
}

function draw() {
	background(255);

	//draw ticks
	for (var i = 0; i < 144; i++) {
		var radius = radians(i * tickDistance) - HALF_PI - radians(tickDistance * 12);
		if (i < 24) { //hour ticks
			noFill();
			stroke(242, 102, 102);
			strokeWeight(2);
			if ((i + 1) % 4 == 0) {
				line(cx, cy, cx + cos(radius) * (r + longTick), cy + sin(radius) * (r + longTick));
			} else {
				line(cx, cy, cx + cos(radius) * (r + shortTick), cy + sin(radius) * (r + shortTick));
			}
		} else if (i >= 24 && i < 84) {
			noFill();
			stroke(245, 238, 122);
			strokeWeight(2);
			if ((i + 1) % 5 == 0) {
				line(cx, cy, cx + cos(radius) * (r + longTick), cy + sin(radius) * (r + longTick));
			} else {
				line(cx, cy, cx + cos(radius) * (r + shortTick), cy + sin(radius) * (r + shortTick));
			}
		} else {
			noFill();
			stroke(122, 198, 248);
			strokeWeight(2);
			if ((i + 1) % 5 == 0) {
				line(cx, cy, cx + cos(radius) * (r + longTick), cy + sin(radius) * (r + longTick));
			} else {
				line(cx, cy, cx + cos(radius) * (r + shortTick), cy + sin(radius) * (r + shortTick));
			}
		}
	}
	noStroke();
	fill(255);
	ellipse(cx, cy, 2 * r);
	//write axies names
	fill(100);
	textSize(20);
	text("H", cx - 10, cy - r - 60);
	text("S", cx - r - 60, cy + r * 2 / 3);
	text("M", cx + r + 50, cy + r * 2 / 3);

	//draw time curves
	var s = radians(second() * tickDistance) + HALF_PI;
	var m = radians(minute() * tickDistance) - HALF_PI + radians(tickDistance * 12);
	var h = radians((hour() - 1) * tickDistance) - HALF_PI - radians(tickDistance * 12);
	fill(0);
	stroke(0);
	strokeWeight(5);

	quadraticCurve(cos(m) * r + cx, sin(m) * r + cy, cx, cy, cos(s) * r + cx, sin(s) * r + cy, 2, "#d2ed96");
	quadraticCurve(cos(m) * r + cx, sin(m) * r + cy, cx, cy, cos(h) * r + cx, sin(h) * r + cy, 2, "#d2ed96");
}
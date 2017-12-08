var cx, cy;

var leftX, topY, rectWidth;
var hBlockSize, blockSize;

var startR = 135;
var startG = 185;
var startB = 198;
var endR = 215;
var endG = 234;
var endB = 242;
var diffR = (endR - startR) / 12;
var diffG = (endG - startG) / 12;
var diffB = (endB - startB) / 12;

function setup() { 
  createCanvas(1024, 768);var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	cx = width/2;
	cy = height/2;
	
	rectWidth = 600;
	leftX = (width - rectWidth)/2;
	topY = (height - rectWidth)/2;
	
	hBlockSize = rectWidth/12;
	blockSize = rectWidth/60;
} 

function draw() { 
  background(255);
	
	//draw hour blocks
	var h = hour() >= 12 ? hour()-12 : hour();
	for(var i = 0; i < h; i++){
		noStroke();
		fill(startR + i*diffR, startG + i*diffG, startB + i*diffB);
		rect(leftX+i*hBlockSize, topY, hBlockSize, rectWidth);
	}
	//draw minute and second lines
	var m = minute();
	var s = second();
	var mStartX = leftX + rectWidth;
	var mStartY = topY + rectWidth;
	var sStartX = leftX;
	var sStartY = topY;
	fill(100);
	stroke(100);
	strokeWeight(1);
	for(var i = 0; i <= m; i++){
		line(leftX, mStartY-i*blockSize, mStartX-i*blockSize, mStartY-i*blockSize);
	}
	for(var i = s; i < 60; i++){
		line(sStartX+i*blockSize, topY, sStartX+i*blockSize, sStartY+i*blockSize);
	}
	
	//draw frame
	stroke(80);
	strokeWeight(1);
	fill(255, 0);
	rect(leftX, topY, rectWidth, rectWidth);
	line(leftX, topY, leftX+rectWidth, topY+rectWidth);
	//write tick numbers
	noStroke();
	fill(80);
	textSize(17);
	text("0", leftX-5, topY-15);
	text("0", leftX-hBlockSize/2-5, topY+rectWidth+20);
	for(var i = 1; i < 61; i++){
		if(i%5 == 0){
			text(i/5, leftX-hBlockSize/2+i/5*hBlockSize-5, topY+rectWidth+20);
			text(i, leftX-30, topY+rectWidth-i/5*hBlockSize+5);
			text(i, leftX+i/5*hBlockSize-5, topY-15);
		}
	}
}
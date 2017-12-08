var cx, cy;
var blockSize = 40;
var hourBlockSize = 60;
var minBlockSize = 45;
var secBlockSize = 30;

var topY = 30;
var bottomY = 630;
var leftX = 212;
var rightX = 812;

function setup() {
	createCanvas(1024, 768);var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	document.getElementById("defaultCanvas0").className = "shadow";

	cx = width / 2;
	cy = height / 2;
}

function draw() {
	background(255);

	//draw time blocks
	var h = hour() >= 12 ? hour()-12 : hour();
	var m = minute();
	var s = second();
	noStroke();
	fill(232, 245, 252);
	if(h < 3){
		rect(h*5*blockSize+leftX-hourBlockSize/2, topY-hourBlockSize/2, hourBlockSize, hourBlockSize);
	}else if(h >=3 && h < 6){
		rect(rightX-hourBlockSize/2, topY+h%3*5*blockSize-hourBlockSize/2, hourBlockSize, hourBlockSize);
	}else if(h >=6 && h < 9){
		rect(blockSize*15-h%3*5*blockSize+leftX-hourBlockSize/2, bottomY-hourBlockSize/2, hourBlockSize, hourBlockSize);
	}else{
		rect(leftX-hourBlockSize/2, bottomY-h%3*5*blockSize-hourBlockSize/2, hourBlockSize, hourBlockSize);
	}
	
	fill(193, 222, 234);
	if(m < 15){
		rect(m*blockSize+leftX-minBlockSize/2, topY-minBlockSize/2, minBlockSize, minBlockSize);
	}else if(m >=15 && m < 30){
		rect(rightX-minBlockSize/2, topY+m%15*blockSize-minBlockSize/2, minBlockSize, minBlockSize);
	}else if(m >=30 && m < 45){
		rect(blockSize*15-m%15*blockSize+leftX-minBlockSize/2, bottomY-minBlockSize/2, minBlockSize, minBlockSize);
	}else{
		rect(leftX-minBlockSize/2, bottomY-m%15*blockSize-minBlockSize/2, minBlockSize, minBlockSize);
	}
	
	fill(135, 185, 198);
	if(s < 15){
		rect(s*blockSize+leftX-secBlockSize/2, topY-secBlockSize/2, secBlockSize, secBlockSize);
	}else if(s >=15 && s < 30){
		rect(rightX-secBlockSize/2, topY+s%15*blockSize-secBlockSize/2, secBlockSize, secBlockSize);
	}else if(s >=30 && s < 45){
		rect(blockSize*15-s%15*blockSize+leftX-secBlockSize/2, bottomY-secBlockSize/2, secBlockSize, secBlockSize);
	}else{
		rect(leftX-secBlockSize/2, bottomY-s%15*blockSize-secBlockSize/2, secBlockSize, secBlockSize);
	}
	
	//draw lines
	stroke(100);
	strokeWeight(2);
	line(leftX, topY, rightX, topY);
	line(leftX, bottomY, leftX, topY);
	line(leftX, bottomY, rightX, bottomY);
	line(rightX, topY, rightX, bottomY);
	
	//draw ticks
	for(var i = 1; i < 15; i++){
		if(i % 5 == 0){
			line(leftX-35, i*blockSize + topY, leftX, i*blockSize + topY);
			line(rightX+35, i*blockSize + topY, rightX, i*blockSize + topY);
			line(i*blockSize + leftX, topY - 35, i*blockSize + leftX, topY);
			line(i*blockSize + leftX, bottomY, i*blockSize + leftX, bottomY + 35);
		}else{
			line(leftX-15, i*blockSize + topY, leftX, i*blockSize + topY);
			line(rightX+15, i*blockSize + topY, rightX, i*blockSize + topY);
			line(i*blockSize + leftX, topY - 15, i*blockSize + leftX, topY);
			line(i*blockSize + leftX, bottomY, i*blockSize + leftX, bottomY + 15);
		}
	}
	
	//write tick number
	stroke(0);
	strokeWeight(1);
	textSize(25);
	fill(0);
	text("3", rightX + 5, topY - 5);
	text("6", rightX + 5, bottomY + 25);
	text("9", leftX -25, bottomY + 25);
	text("12", leftX -35, topY - 5);
	
	//legend
	noStroke();
	fill(232, 245, 252);
	rect(cx - 160, height - 60, hourBlockSize, hourBlockSize);
	fill(193, 222, 234);
	rect(cx, height - 55, minBlockSize, minBlockSize);
	fill(135, 185, 198);
	rect(cx + 160, height - 50, secBlockSize, secBlockSize);
	fill(0);
	text("H", cx - 80, height - 20);
	text("M", cx + 70, height - 20);
	text("S", cx + 220, height - 20);
}
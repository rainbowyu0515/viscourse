var cx, cy;
var blockSize = 100;
var sBlockSize = 10;

var topY = 84;
var bottomY = 684;
var leftX = 212;
var rightX = 812;

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
	createCanvas(1024, 768);

	var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	//var ctx = canvas.getContext("2d");
	//ctx.scale(0.5, 0.5);


	cx = width / 2;
	cy = height / 2;
}

function draw() {
	background(255);

	noStroke();
	textSize(15);
	fill(100);
	//write tick number
	for(var i = 0; i <= 12; i++){
		if(i <= 6){
			text(i, rightX + 20, bottomY - i * (blockSize+2));
		}else{
			text(i, leftX + (12-i)*(blockSize+2), bottomY - 6 * (blockSize+2));
		}
	}
	
	//draw hour blocks
	noStroke();
	var h = hour() > 12 ? hour()-12 : hour();
	// var h = 8;
	if(h < 6){
		for(var i = 0; i <= h; i++){
			fill(startR + diffR * i, startG + diffG * i, startB + diffB * i);
			quad(rightX, bottomY - blockSize * i, rightX, bottomY - blockSize * (i+1), rightX - blockSize * (i+1), bottomY, rightX - blockSize * i, bottomY);
		}
	}else{
		for(var i = 0; i <= 5; i++){
			fill(startR + diffR * i, startG + diffG * i, startB + diffB * i);
			quad(rightX, bottomY - blockSize * i, rightX, bottomY - blockSize * (i+1), rightX - blockSize * (i+1), bottomY, rightX - blockSize * i, bottomY);
		}
		for(var i = 0; i <= h-6; i++){
			fill(startR + diffR * (i+6), startG + diffG * (i+6), startB + diffB * (i+6));
			quad(rightX - i * blockSize, topY, rightX - (i+1) * blockSize, topY, leftX, bottomY - (i+1) * blockSize, leftX, bottomY - i * blockSize);
		}
	}
	
	//draw minutes and seconds
	var m = minute();
	var s = second();
	stroke(120);
	strokeWeight(10);
	line(rightX, bottomY, (1-m/60)*blockSize*6+leftX, (1-m/60)*blockSize*6+topY);
	line(leftX, bottomY, (s/60)*blockSize*6+leftX, (1-s/60)*blockSize*6+topY);
	
	//draw ticks
	strokeWeight(5);
	for(var i = 0; i <= 60; i++){
		if(60 - i > m){
			stroke(70);
		}else{
			stroke(230);
		}
		point(leftX + i * sBlockSize, topY + i * sBlockSize);
		
		if(i > s){
			stroke(70);
		}else{
			stroke(230);
		}
		point(leftX + i * sBlockSize, bottomY - i * sBlockSize);
	}
	
	stroke(255);
	strokeWeight(12);
	fill(255, 0);
	rect(leftX, topY, blockSize*6, blockSize*6);
}
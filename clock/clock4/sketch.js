var cx, cy;

var leftX, topY, triangleWidth, hBlockWidth, blockWidth;
var longTickLength = 10;
var shortTickLength = 5;

function setup() { 
  createCanvas(1024, 768);var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
	cx = width/2;
	cy = height/2;
	
	triangleWidth = 600;
	leftX = (width - triangleWidth)/2;
	topY = (height - triangleWidth/2*sqrt(3))/2;
	hBlockWidth = triangleWidth/12;
	blockWidth = triangleWidth/60;
} 

function draw() { 
  background(255);
	
	//draw triangle
	fill(100);
	stroke(100);
	strokeWeight(2);
	line(leftX, topY, leftX+triangleWidth, topY);
	line(leftX, topY, leftX+triangleWidth/2, topY+triangleWidth/2*sqrt(3));
	line(leftX+triangleWidth, topY, leftX+triangleWidth/2, topY+triangleWidth/2*sqrt(3));
	
	//draw ticks and write tick numbers
	for(var i = 1; i < 60; i++){
		if(i%5 == 0){
			fill(100);
			stroke(100);
			strokeWeight(2);
			line(leftX+i/5*hBlockWidth, topY, leftX+i/5*hBlockWidth, topY-longTickLength);
			line(leftX+i/5*hBlockWidth/2, topY+i/5*hBlockWidth/2*sqrt(3), leftX+i/5*hBlockWidth/2+longTickLength/2*sqrt(3), topY+i/5*hBlockWidth/2*sqrt(3)-longTickLength/2);
			line(leftX+triangleWidth-i/5*hBlockWidth/2, topY+i/5*hBlockWidth/2*sqrt(3), leftX+triangleWidth-i/5*hBlockWidth/2-longTickLength/2*sqrt(3), topY+i/5*hBlockWidth/2*sqrt(3)-longTickLength/2);
			
			noStroke();
			fill(80);
			textSize(17);
			text(i/5, leftX+i/5*hBlockWidth-5, topY-20);
			text(i, leftX+triangleWidth/2-i/5*hBlockWidth/2-25, topY+triangleWidth/2*sqrt(3)-i/5*hBlockWidth/2*sqrt(3)+15);
			text(i, leftX+triangleWidth-i/5*hBlockWidth/2+5, topY+i/5*hBlockWidth/2*sqrt(3)+15);
		}else{
			fill(150);
			stroke(150);
			strokeWeight(1);
			line(leftX+i*blockWidth/2, topY+i*blockWidth/2*sqrt(3), leftX+i*blockWidth/2+shortTickLength/2*sqrt(3), topY+i*blockWidth/2*sqrt(3)-shortTickLength/2);
			line(leftX+triangleWidth-i*blockWidth/2, topY+i*blockWidth/2*sqrt(3), leftX+triangleWidth-i*blockWidth/2-shortTickLength/2*sqrt(3), topY+i*blockWidth/2*sqrt(3)-shortTickLength/2);
		}
	}
	
	//draw time lines
	var h = hour() >= 12 ? hour()-12 : hour();
	var m = minute();
	var s = second();
	
	var hx = leftX + h*hBlockWidth;
	var hy = topY;
	var mx = leftX + triangleWidth/2 - m*blockWidth/2;
	var my = topY + triangleWidth/2*sqrt(3) - m*blockWidth/2*sqrt(3);
	var sx = leftX + triangleWidth - s*blockWidth/2;
	var sy = topY + s*blockWidth/2*sqrt(3);
	
	fill(30);
	stroke(30);
	strokeWeight(2);
	line(hx, hy, mx, my);
	line(mx, my, sx, sy);
}
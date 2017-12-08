var cx, cy;
var blockSize = 10;

function setup() { 
  createCanvas(1024, 768);
	var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "512px";
	canvas.style.height = "384px";
	cx = width / 2;
	cy = height / 2;
} 

function draw() { 
  background(255);
	
	var leftX = 212;
	var rightX = 812;
	var topY = 84;
	var bottomY = 684;
	
	//draw frame
	textSize(16);
	for(var i = 0; i < 61; i++){
		//draw hori and vert lines, draw a long line on each 5, others the short lines
		if(i%5 == 0){//long line and write text
			stroke(0);
			strokeWeight(1);
			line(leftX + i * blockSize, bottomY, leftX + i * blockSize, topY);//vert
			line(leftX, bottomY - i * blockSize, rightX, bottomY - i * blockSize);//hori
			
			//write tick number
			noStroke();
			if(i == 0){
				text(i, leftX - 23, bottomY + 20);
			}else{
				text(i, leftX + i * blockSize - 5, bottomY + 20);
				text(i, leftX - 25, bottomY - i * blockSize + 5);
			}
			
		}else{
			stroke(0);
			strokeWeight(1);
			line(leftX + i * blockSize, bottomY, leftX + i * blockSize, bottomY-7);
			line(leftX, bottomY - i * blockSize, leftX+7, bottomY - i * blockSize);
		}
	}
	
	//draw time blocks
	
var h = hour() <= 12 ? hour() : hour() - 12;
	var m = minute();
	var s = second();
	
	//draw vert
	var hOffsetX = (h-1) * blockSize * 5;
	var minBlockStartX = leftX + hOffsetX;
	var hOffsetY = m * blockSize;
	var minBlockStartY = blockSize * 60 - hOffsetY + topY;
	noStroke();
	fill(0);
	rect(minBlockStartX, minBlockStartY, blockSize * 5, m * blockSize);
	
	//draw hori
	var secBlockStartX = leftX;
	hOffsetY = (h) * blockSize * 5;
	var secBlockStartY = blockSize * 60 - hOffsetY + topY;
	rect(secBlockStartX, secBlockStartY, s * blockSize, 5 * blockSize);
	
}
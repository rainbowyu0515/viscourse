function setup(){
	createCanvas(297,297);
	var canvas = document.getElementById("defaultCanvas0");
	canvas.style.width = "682px";
	canvas.style.height = "512px";
}

function draw(){
	background(255)
	
	noStroke();
	fill(0);
	var startX = 30;
	var startWidth = 6;
	var blackY = 100;
	var blackHeight = 96;
	
	var diffX = 24;
	var diffWidth = 2;
	
	var whiteStartY = 112;
	var whiteDiffY = 12;
	
	for(var i = 0; i < 10; i++){
		rect(startX + i * diffX, blackY, startWidth + i * diffWidth, blackHeight);	
	}

	
	fill(255);
	rect(floor(hour()/10)*diffX+startX, whiteStartY, diffX, whiteDiffY);
	rect(hour()%10*diffX+startX, whiteStartY + whiteDiffY, diffX, whiteDiffY);
  rect(floor(minute()/10)*diffX+startX, whiteStartY + whiteDiffY * 2, diffX, whiteDiffY);
	rect(minute()%10*diffX+startX, whiteStartY + whiteDiffY * 3, diffX, whiteDiffY);
  rect(floor(second()/10)*diffX+startX, whiteStartY + whiteDiffY * 4, diffX, whiteDiffY);
	rect(second()%10*diffX+startX, whiteStartY + whiteDiffY * 5, diffX, whiteDiffY);
}
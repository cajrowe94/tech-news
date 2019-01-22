var canvas; //canvas variable to hold that element
var c; //context variable to draw

var points = [];

var mouse = {x:0, y:0};

$(document).ready(function(){
	//get canvas
	canvas = document.getElementById('my-canvas');
	//get context
	c = canvas.getContext('2d');
	//set canvas to full-screen
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	
	$(document).on('mousemove', function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});
	
	$("#sub-link").click(function(){
		$([document.documentElement, document.body]).animate({
			scrollTop: $(".section-subscriptions").offset().top
		}, 1000);
	});
	
	for (var i = 0; i < 1000; i++){
		var point = new Point();
		points.push(point);
	}
	
	setInterval(animate,33);
	
	
});

function animate(){
	c.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < points.length; i++){
		points[i].move();
	}
	
	checkCollisions();
}

function Point(){
	//set object params
	this.x = getRandomInt(10, canvas.width-10);
	this.y = getRandomInt(10, canvas.height-10)
	this.xVel = getRandomFloat(-1, 1);
	this.yVel = getRandomFloat(-1, 1);
	this.rad = 2; //they will be invisible, this is not as important then
	
	//function that draws the points
	this.show = function(){
		c.strokeStyle = 'black';
		c.beginPath();
		c.lineWidth = .1;
		c.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
		c.stroke();
	}
	//this func moves the points across the screen
	this.move = function(){
		//check for edge hits
		if (this.x <= this.rad || this.x > canvas.width-this.rad) this.xVel *= -1;
		if (this.y <= this.rad || this.y > canvas.height-this.rad) this.yVel *= -1;
		this.x += this.xVel;
		this.y += this.yVel;
	}
}

//checks if points are close to eachother
function checkCollisions(){
	var dist;
	for (var i = 0; i < points.length; i++){
		for (var j = 0; j < points.length; j++){
			dist = calcDist(points[i].x, points[i].y, points[j].x, points[j].y);
			var mouseDist = calcDist(mouse.x, mouse.y, points[j].x, points[j].y);
				if (dist < 50 && dist > 1){
					if (mouseDist < 150){
						c.strokeStyle = 'rgba(0, 0, 0, 0.56)';
					} else c.strokeStyle = 'rgb(255, 255, 255)';
					c.beginPath();
					c.moveTo(points[i].x, points[i].y);
					c.lineTo(points[j].x, points[j].y);
					c.lineWidth = .1;
					c.stroke();
				}
		}
	}
}

	
//calculate the dist between two objects
function calcDist(xin, yin, x2in, y2in){
	var a = xin - x2in;
	var b = yin - y2in;

	var c = Math.sqrt(a*a + b*b);

	return c;
}
	
//random functions
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
            
function getRandomFloat(min, max){
    return Math.random() * (max - min) + min;
}
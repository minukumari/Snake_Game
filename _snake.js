const cv = document.getElementById("snake");
const cx = cv.getContext("2d");

const box = 32;
const ground = new Image();
ground.src = "C:/Users/user/snake/img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

let snake = [];
snake[0] = {
	x : 9*box,
	y : 10*box
};

let food = {
	x : Math.floor(Math.random()*15 + 1)*box,
	y : Math.floor(Math.random()*17 + 3)*box
}
let score=0;

let d ;
document.addEventListener("keydown",direction);
function direction(){
	let key = event.keyCode;
	if(key == 37 && d !="RIGHT"){
		left.play();
		d = "LEFT";
	}else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }else if (key == 80) {
    	d = "paused";
    }
}
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
	cx.drawImage(ground,0,0);
	for( let i = 0; i < snake.length ; i++){
        cx.fillStyle = ( i == 0 )? "green" : "white";
        cx.fillRect(snake[i].x,snake[i].y,box,box);
        
        cx.strokeStyle = "red";
        cx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    cx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    function tooglePause(){
    	if(! d)
    	{
    		d = true;
    	}else if (d) {
    		d = false;
    	}
    }
    
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        cx.font = "30px Arial";
        cx.fillStyle = "red";
        cx.textAlign = "center";
        cx.fillText("GAME OVER" , 303, 303);
    }
    
    snake.unshift(newHead);
    
    cx.fillStyle = "white";
    cx.font = "45px Changa one";
    cx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);


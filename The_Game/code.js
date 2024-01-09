let canvas = document.getElementById("canvasBreakOut");
let ctx = canvas.getContext("2d");


let Ball = new ball(new Vector2(200, 200), new Vector2(0.1,-0.1), 10, "red");

let PlatformObject = new Platform( new Vector2( 200, 270 ), 95, 20 );

let numberOfRows = 5;
let numberOfColumns = 5;
let brickWidth = canvas.width / numberOfRows;
let brickHeight = canvas.height / numberOfColumns;
let rowArray = [];
let brickArray = [];

for (let c = 0; c < numberOfColumns; c++) {
    for (let r = 0; r < numberOfRows; r++) {
        let brick = new Brick(new Vector2(brickWidth*r, 20*c), brickWidth, 20, 'rgb(' + Math.random()*255 + ", 100, 100)");
        brickArray.push(brick);
    }

}

console.log(brickArray);
function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    brickArray.forEach(brick => {
        brick.draw();
    });
}

function Clamp( min, max, num ){
    return Math.max( min, Math.min( num, max ) );
}

let lastTime;
function animation(time) {
    if(lastTime == undefined) {
        lastTime = time;
        requestAnimationFrame(animation);
        return;
    }

    let deltaTime = time - lastTime;
    lastTime = time;

    clearCanvas();



    Ball.draw();
    PlatformObject.Draw();
    Ball.update( deltaTime );
    Ball.checkCollision();
    brickArray = Ball.brickCollision(brickArray);
    Ball.brickCollision(PlatformObject);
    PlatformObject.Update()

    requestAnimationFrame(animation);
}

animation();


document.onkeydown = event => PlatformObject.ProcessInput( event, true );
document.onkeyup = event => PlatformObject.ProcessInput( event, false );
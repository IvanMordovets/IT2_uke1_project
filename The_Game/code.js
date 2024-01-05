let canvas = document.getElementById("canvasBreakOut");
let ctx = canvas.getContext("2d");


let Ball = new ball(new Vector2(200, 200), new Vector2(0.1,0.01), 10, "red");
let PlatformObject = new Platform( new Vector2( 200, 350 ), 30, 50 );

let numberOfRows = 10;
let numberOfColumns = 6;
let rowArray = [];
let columnArray = [];

for (let c = 0; c < numberOfColumns; c++) {
    for (let r = 0; r < numberOfRows; r++) {
        let brick = new Brick(new Vector2(0, 0), ctx.canvas.width / numberOfColumns, 20, "red");
        rowArray.push(brick);
    }
    columnArray.push(brick);
}

function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    requestAnimationFrame(animation);
}

animation();
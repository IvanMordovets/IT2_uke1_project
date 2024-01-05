let canvas = document.getElementById("canvasBreakOut");
let ctx = canvas.getContext("2d");


let Ball = new ball(new Vector2(200, 200), new Vector2(0.1,0.01), 10, "red");

let PlatformObject = new Platform( new Vector2( 200, 270 ), 95, 20 );


function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    PlatformObject.Update()
    Ball.checkCollision();

    requestAnimationFrame(animation);
}

animation();


document.onkeydown = event => PlatformObject.ProcessInput( event, true );
document.onkeyup = event => PlatformObject.ProcessInput( event, false );
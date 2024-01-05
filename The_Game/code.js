let canvas = document.getElementById("canvasBreakOut");
let ctx = canvas.getContext("2d");


let Ball = new ball(new Vector2(200, 200), new Vector2(0.1,0.01), 10, "red");


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
    Ball.update( deltaTime );
    Ball.checkCollision();

    requestAnimationFrame(animation);
}

animation();
class ball {
    
    #position;
    #velocity;
    #radius;
    #color;

    constructor(position, velocity, radius, color) {
        this.#position = position;
        this.#velocity = velocity;
        this.#radius = radius;
        this.#color = color;
    }

    get position() {
        return this.#position;
    }

    get velocity() {
        return this.#velocity;
    }

    checkCollision() {

        //wall collision
        if(this.#position.x - this.#radius < 0 || this.#position.x + this.#radius > canvas.width) {
            this.#velocity.flipX();
        }
        if(this.#position.y - this.#radius < 0 || this.#position.y + this.#radius > canvas.height) {
            this.#velocity.flipY();
        }
    }

    update( deltaTime ) {
        //euler's method
        this.#position.add( Vector2.scaled( this.#velocity, deltaTime));
        
    }

    draw() {
        ctx.fillStyle = this.#color;
        ctx.beginPath();
        ctx.arc(this.#position.x, this.#position.y, this.#radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}
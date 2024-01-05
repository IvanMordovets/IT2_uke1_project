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

    checkCollision( brickArray ) {

        //wall collision
        if(this.#position.x - this.#radius < 0) {
            let xOffset = (this.#position.x - this.#radius);
            this.#velocity.flipX();
            this.#position.subtract({x:xOffset, y:0});
        } 
        else if(this.#position.x + this.#radius > canvas.width) {
            let xOffset = (canvas.width - this.#position.x - this.#radius);
            this.#velocity.flipX();
            this.#position.add({x:xOffset, y:0});
        }

        if(this.#position.y - this.#radius < 0) {
            let yOffset = (this.#position.y - this.#radius);
            this.#velocity.flipY();
            this.#position.subtract({x:0, y:yOffset});
        } 
        else if(this.#position.y + this.#radius > canvas.height) {
            let yOffset = (canvas.height - this.#position.y - this.#radius);
            this.#velocity.flipY();
            this.#position.add({x:0, y:yOffset});
        }
        


        
        brickArray.forEach(brick => {
            if(this.#position.x+ this.#radius > brick.position.x &&
               this.#position.x < brick.position.x + brick.width &&
               this.#position.y + this.#radius > brick.position.y &&
               this.#position.y < brick.position.y + brick.height) {
                this.#velocity.flipY();
               }
        });
    }

    update( deltaTime ) {
        //euler's method
        this.#position.add( Vector2.scaled( this.#velocity, deltaTime));

    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.#color;
        ctx.beginPath();
        ctx.arc(this.#position.x, this.#position.y, this.#radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}
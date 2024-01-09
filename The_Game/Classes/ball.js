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

    checkCollision(  ) {

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
        


        
    }

    brickCollision(brickArray, deltaTime) {
        let brickAmount = brickArray.lenght;
        for(let i = 0; i<brickAmount; i ++) 
        {
            if(this.rectangleCollision( brickArray[i], deltaTime )){
                
            }
        }
    }

    rectangleCollision( rectangle, deltaTime) {
        let nextPosition = this.#position.add(Vector2.scaled( this.#velocity, deltaTime ));
        if (
            nextPosition.x + this.#radius > rectangle.position.x &&
            nextPosition.x - this.#radius < rectangle.position.x + rectangle.width &&
            nextPosition.y + this.#radius > rectangle.position.y &&
            nextPosition.y - this.#radius < rectangle.position.y + rectangle.height
        ) {
                
            return true;
        }
        return false;
    }



    update( deltaTime ) {
        //euler's metho
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
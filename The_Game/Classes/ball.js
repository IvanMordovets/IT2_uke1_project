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
        let brickAmount = brickArray.length;
        let nextPosition = this.#position.clone();
        nextPosition.add(Vector2.scaled( this.#velocity, deltaTime ));



        // Branches innit

        for(let i = 0; i<brickAmount; i ++) {
            let brick = brickArray[i];

            if(this.rectangleCollision( brick, nextPosition.x, nextPosition.y )){
                console.log(brick);
                
                if(((this.#position.x + this.#radius < brick.position.x && nextPosition.x + this.#radius > brick.position.x) ||
                    (this.#position.x - this.#radius > brick.position.x + brick.width && nextPosition.x - this.#radius < brick.position.x + brick.width)) &&
                    (this.#position.y + this.#radius > brick.position.y || this.#position.y - this.#radius < brick.position.y + brick.height)) {
                    this.#velocity.flipX();
                }
                

                if(this.#position.y + this.#radius > brick.position.y || this.#position.y - this.#radius < brick.position.y + brick.height) {
                    this.#velocity.flipY();
                }

                brickArray.splice(i, 1);
                console.log("collision");
                return brickArray;
            }
        }
        return brickArray;
    }

    rectangleCollision( rectangle, x, y) {

        if (
            x + this.#radius > rectangle.position.x &&
            x - this.#radius < rectangle.position.x + rectangle.width &&
            y + this.#radius > rectangle.position.y &&
            y - this.#radius < rectangle.position.y + rectangle.height
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
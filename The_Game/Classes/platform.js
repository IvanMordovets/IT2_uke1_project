// Constants 
const PLATFORM_SPEED = 5;

class Platform {
    #Position;
    #Direction;
    #Colour;
    #InputsActivated = {
        A : false,
        D : false,
        ARROWLEFT : false,
        ARROWRIGHT : false
    };
    #Width;
    #Height;


    constructor( Position, Width, Height ){
        this.#Position = Position;
        this.#Width = Width;
        this.#Height = Height;
        this.#Colour = `rgb(255, 255, 0)`

        this.#Direction = 0;
    }

    get Width(){
        return this.#Width;
    }

    get Height(){
        return this.#Height;
    }

    ProcessInput( Event, KeyIsDown ){
        if (!(Event.key.toUpperCase() in this.#InputsActivated)){
            return;
        }

        let Key = Event.key.toUpperCase();
        this.#InputsActivated[Key] = KeyIsDown; 
    }   

    Update(){
        this.#Direction = 0;

        for ( const [Input, KeyDown] of Object.entries( this.#InputsActivated ) ){
            
            if ( !KeyDown ){
                continue;
            }
            
            switch ( Input ){
                case "A":
                    this.#Direction = -PLATFORM_SPEED
                    break;
                case "D":
                    this.#Direction = PLATFORM_SPEED;
                    break;
                case "ARROWLEFT":
                    this.#Direction = -PLATFORM_SPEED;
                    break;
                case "ARROWRIGHT":
                    this.#Direction = PLATFORM_SPEED;
                    break;
            }
        }

        this.#Position.add( new Vector2(  this.#Direction, 0 ) );
    }


    Draw(){
        ctx.fillStyle = this.#Colour;
        ctx.fillRect( 
            this.#Position.x - this.#Width/2 , this.#Position.y - this.#Height/2,
            this.#Width, this.#Height  
        );
    }
}
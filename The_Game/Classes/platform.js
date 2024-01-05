class Platform {
    #Position;
    #Direction;
    #Colour;
    #InputsActivated = {
        A : false,
        D : false,
        LEFTARROW : false,
        RIGHTARROW : false
    };
    #Width;
    #Height;


    constructor( Width, Height ){
        this.#Position = new Vector2( 200, 200 );
        this.#Width = Width;
        this.#Height = Height;
        this.#Colour = `rgb(255, 0, 0)`

        this.#Direction = 0;
    }

    get Width(){
        return this.#Width;
    }

    get Height(){
        return this.#Height;
    }

    ProcessInput( Event, KeyIsDown ){
        if ( !(Event.Key.toUpperCase() in this.#InputsActivated )) {
            return;    
        }

        Key = Event.Key.toUpperCase();
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
                    this.#Direction = -1;
                    break;
                case "D":
                    this.#Direction = 1;
                    break;
                case "LEFTARROW":
                    this.#Direction = -1;
                    break;
                case "RIGHTARROW":
                    this.#Direction = 1;
                    break;
            }
        }

        this.#Position.add( new Vector2(  this.#Direction, 0 ) );
    }


    Draw(){
        Position = this.#Position;
        Width = this.#Width;
        Height = this.#Height;
        
        context.fillStyle = this.#Colour;
        context.FillRect( 
            Position.x - Width/2 , Position.y - Height/2,
            Width, Height  
        );
    }
}
class Platform {
    #Position;
    #Direction;
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
        this.#Direction = 0;
        this.#Width = Width;
        this.#Height = Height;
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
        Direction = 0;

        for ( const [Input, KeyDown] of Object.entries( this.#InputsActivated ) ){
            if ( !KeyDown ){
                continue;
            }

            switch ( Input ){
                case "A":
                    Direction -= 1;
                    break;
                case "D":
                    Dircetion += 1;
                    break;
                case "LEFTARROW":
                    Direction -= 1;
                    break;
                case "RIGHTARROW":
                    Direction += 1;
                    break;
            }
        }

        this.#Position.add( new Vector2( Direction, 0 ) );
    }


    Draw(){
    
    }
}
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

    ProcessInput( Event ){
        if ( !(Event.Key.toUpperCase() in this.#InputsActivated )) {
            return;    
        }

        Key = Event.Key.toUpperCase();
        this.#InputsActivated[Key] = true;
    }   
}
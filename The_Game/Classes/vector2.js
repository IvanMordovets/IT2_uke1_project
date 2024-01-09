class Vector2 {

    #x;
    #y;

    // Yep
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    static fromPolar(radius, angle) {
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        return new Vector2(x, y);
    }

    //penis og kuk vil Ivan ha

    static between(a, b) {
        let x = b.x - a.x;
        let y = b.y - a.y;
        return new Vector2(x, y);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    toString() {
        return "[" + this.#x + ", " + this.#y + "]";
    }

    get length() {
        return (this.#x**2 + this.#y**2)**(1/2);
    }

    get angle() {
        let radians = Math.atan(this.#y/this.#x);   // Works in 1st quadrant
        if (this.#x < 0) {
            radians += Math.PI;                     // Fix 2nd and 3rd quadrant
        } else if (this.#x >= 0 && this.#y < 0 ) {
            radians += Math.PI*2;                   // Fix 4th quadrant
        }   
        return radians;
    }
    
    add(vector) {
        this.#x += vector.x;
        this.#y += vector.y;
    }

    subtract(vector) {
        this.#x -= vector.x;
        this.#y -= vector.y;
    }

    multiply(scalar) {
        this.#x *= scalar;
        this.#y *= scalar;
    }

    static scaled( vector, scalar ) {
        let x = vector.x *scalar;
        let y = vector.y *scalar;
        return new Vector2( x, y);
    }

    divide(scalar) {
        this.#x /= scalar;
        this.#y /= scalar;
    }

    static dotProduct(a, b) {
        let dp = a.x*b.x + a.y*b.y;
        return dp;
    }

    static sum(a, b) {
        let x = a.x + b.x;
        let y = a.y + b.y;
        return new Vector2(x, y);
    }

    static difference(a, b) {
        let x = a.x - b.x;
        let y = a.y - b.y;
        return new Vector2(x, y);
    }

    clone() {
        return new Vector2(this.#x, this.#y);
    }

    normalize() {
        let newX = this.#x/this.length;
        let newY = this.#y/this.length;
        this.#x = newX;
        this.#y = newY;
    }

    rotate(angle) {
        // Calculate rotated unit vectors (i, j)
        // (~ 2d rotation matrix)
        let i_rotated = new Vector2(  Math.cos(angle),  Math.sin(angle) );
        let j_rotated = new Vector2( -Math.sin(angle),  Math.cos(angle) );

        // Apply to current vector
        i_rotated.multiply(this.#x);
        j_rotated.multiply(this.#y);
        let this_rotated = Vector2.sum(i_rotated, j_rotated);
        this.#x = this_rotated.x;
        this.#y = this_rotated.y;
    }

    flipX() {
        this.#x *= -1;
    }

    flipY() {
        this.#y *= -1;
    }

    static angleBetween(a, b) {
        let dotProductAB = Vector2.dotProduct(a, b);
        let lengthA = a.length;
        let lengthB = b.length;
        let angle = Math.acos( dotProductAB/(lengthA*lengthB) );
        return angle;
    }

    round(digits) {
        let newX = Math.round( this.#x * 10**digits ) / 10**digits;
        let newY = Math.round( this.#y * 10**digits ) / 10**digits;
        this.#x = newX;
        this.#y = newY;
    }

    // ----- extras ------

    static lerp(a, b, t) {
        // https://en.wikipedia.org/wiki/Linear_interpolation
        // lerp(a, b, t) := a + (t * (b - a))
        let vector = a.clone();
        let direction = Vector2.subtract(b, a);
        direction.multiply(t);
        vector.add(direction);
        return vector;
    }

}
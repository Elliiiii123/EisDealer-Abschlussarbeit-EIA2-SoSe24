"use strict";
var EisDealer;
(function (EisDealer) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        scale(factor) {
            return new Vector(this.x * factor, this.y * factor);
        }
        add(vector) {
            return new Vector(this.x + vector.x, this.y + vector.y);
        }
        subtract(vector) {
            return new Vector(this.x - vector.x, this.y - vector.y);
        }
        clone() {
            return new Vector(this.x, this.y);
        }
        // Method to multiply vector by scalar
        // multiply(scalar: number): Vector {
        //     return new Vector(this.x * scalar, this.y * scalar);
        // }
        // Method to get the magnitude of the vector
        magnitude() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        normalize() {
            const mag = this.magnitude();
            if (mag === 0) {
                return new Vector(0, 0);
            }
            return new Vector(this.x / mag, this.y / mag);
        }
        // Methode zur Überprüfung, ob zwei Vektoren gleich sind
        equals(other) {
            return this.x === other.x && this.y === other.y;
        }
    }
    EisDealer.Vector = Vector;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Vector.js.map
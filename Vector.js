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
        copy() {
            return new Vector(this.x, this.y);
        }
        distanceTo(vector) {
            let dx = this.x - vector.x;
            let dy = this.y - vector.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
    EisDealer.Vector = Vector;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Vector.js.map
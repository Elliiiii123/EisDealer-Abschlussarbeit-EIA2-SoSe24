"use strict";
var EisDealer;
(function (EisDealer) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        // scale(_factor: number): void {
        // this.x *= _factor;
        // this.y *= _factor;
        // }
        // add(_addend: Vector): void {
        //     this.x += _addend.x;
        //     this.y += _addend.y;
        // }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        normalize() {
            let length = Math.sqrt(this.x * this.x + this.y * this.y);
            this.x /= length;
            this.y /= length;
            return this;
        }
    }
    EisDealer.Vector = Vector;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Vector.js.map
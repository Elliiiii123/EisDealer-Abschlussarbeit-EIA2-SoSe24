"use strict";
var EisDealer;
(function (EisDealer) {
    class Door extends EisDealer.Moveable {
        constructor(_position, _speed, _direction) {
            super(_position, _speed, _direction);
        }
        move() {
        }
        draw() {
        }
    }
    EisDealer.Door = Door;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Door.js.map
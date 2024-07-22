"use strict";
var EisDealer;
(function (EisDealer) {
    class Moveable extends EisDealer.Drawable {
        direction;
        speed;
        constructor(_position, _speed, _direction) {
            //console.log("Duck Constructor")
            super(_position);
            this.position = _position;
            this.direction = _direction;
            this.speed = _speed;
        }
        update() {
            this.draw();
            this.move();
        }
    }
    EisDealer.Moveable = Moveable;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Moveable.js.map
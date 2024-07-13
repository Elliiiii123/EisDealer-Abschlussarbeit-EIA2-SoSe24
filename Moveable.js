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
        move() {
            let newPosition = this.position.add(this.speed);
            // Check for canvas boundaries
            if (newPosition.x < 0 || newPosition.x > EisDealer.crc2.canvas.width) {
                this.speed.x *= -1;
            }
            if (newPosition.y < 0 || newPosition.y > EisDealer.crc2.canvas.height) {
                this.speed.y *= -1;
            }
            this.position = this.position.add(this.speed);
        }
        update() {
            this.draw();
            this.move();
        }
    }
    EisDealer.Moveable = Moveable;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Moveable.js.map
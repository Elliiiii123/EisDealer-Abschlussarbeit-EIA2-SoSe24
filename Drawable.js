"use strict";
var EisDealer;
(function (EisDealer) {
    class Drawable {
        position;
        constructor(_position) {
            this.position = _position;
        }
        update() {
            this.draw();
        }
    }
    EisDealer.Drawable = Drawable;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Drawable.js.map
"use strict";
var EisDealer;
(function (EisDealer) {
    class Drawable {
        x;
        y;
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        update() {
            this.draw();
        }
    }
    EisDealer.Drawable = Drawable;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Drawable.js.map
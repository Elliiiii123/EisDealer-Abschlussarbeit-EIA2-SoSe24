"use strict";
var EisDealer;
(function (EisDealer) {
    class Topping extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Toppings Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Toppings draw");
            this.drawSprinkle();
            this.drawStrawberry();
            this.drawCookie();
        }
        drawSprinkle() {
        }
        drawCookie() {
        }
        drawStrawberry() {
        }
    }
    EisDealer.Topping = Topping;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Topping.js.map
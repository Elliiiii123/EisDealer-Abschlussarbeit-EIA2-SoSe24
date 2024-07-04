"use strict";
var EisDealer;
(function (EisDealer) {
    class Sauce extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Sauce Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Sauce draw");
            this.drawCaramel();
            this.drawStrawberry();
            this.drawChoclate();
        }
        drawChoclate() {
        }
        drawCaramel() {
        }
        drawStrawberry() {
        }
    }
    EisDealer.Sauce = Sauce;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Sauce.js.map
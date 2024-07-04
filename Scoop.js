"use strict";
var EisDealer;
(function (EisDealer) {
    class Scoop extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Scoop Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Scoop draw");
            this.drawChocolate();
            this.drawStrawberry();
            this.drawMint();
            this.drawStraciatella();
            this.drawPistachio();
            this.drawLemon();
        }
        drawChocolate() {
        }
        drawMint() {
        }
        drawStrawberry() {
        }
        drawStraciatella() {
        }
        drawPistachio() {
        }
        drawLemon() {
        }
    }
    EisDealer.Scoop = Scoop;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Scoop.js.map
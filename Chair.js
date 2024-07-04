"use strict";
var EisDealer;
(function (EisDealer) {
    class Chair extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Chair Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Chair draw");
        }
    }
    EisDealer.Chair = Chair;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Chair.js.map
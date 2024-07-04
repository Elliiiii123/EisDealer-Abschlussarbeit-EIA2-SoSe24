"use strict";
var EisDealer;
(function (EisDealer) {
    class Receipt extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Receipt Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Receipt draw");
        }
    }
    EisDealer.Receipt = Receipt;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Receipt.js.map
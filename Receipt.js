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
            //console.log("Receipt draw")
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fillRect(this.position.x, this.position.y, 20, 10);
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fillText("Receipt", this.position.x, this.position.y + 10);
        }
    }
    EisDealer.Receipt = Receipt;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Receipt.js.map
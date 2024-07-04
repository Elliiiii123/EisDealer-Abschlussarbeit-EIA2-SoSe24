"use strict";
var EisDealer;
(function (EisDealer) {
    class Trash extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Trash Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Trash draw");
        }
    }
    EisDealer.Trash = Trash;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Trash.js.map
"use strict";
var EisDealer;
(function (EisDealer) {
    class SelectionScreen extends EisDealer.Drawable {
        selectedSauce;
        selectedTopping;
        scoops;
        constructor(_position) {
            super(_position);
            this.selectedSauce = null;
            this.selectedTopping = null;
            this.scoops = [];
            this.draw();
        }
        //Methode um die ausgewählten Items in dem selection screen anzuzeigen
        addItem(item) {
            if (item instanceof EisDealer.Scoop) {
                this.scoops.push(item);
            }
            else if (item instanceof EisDealer.Sauce) {
                this.selectedSauce = item;
            }
            else if (item instanceof EisDealer.Topping) {
                this.selectedTopping = item;
            }
            this.draw();
        }
        //Methode um screen wieder zu leeren
        clearItems() {
            this.scoops = [];
            this.selectedSauce = null;
            this.selectedTopping = null;
            this.draw();
        }
        // die erhaltenen Items werden gesettet
        getSelection() {
            return {
                scoops: this.scoops,
                topping: this.selectedTopping,
                sauce: this.selectedSauce
            };
        }
        //Zeichne den Selection screen mit der entsprechenden auswahl
        draw() {
            const x = this.position.x;
            const y = this.position.y;
            EisDealer.crc2.save();
            EisDealer.crc2.fillStyle = "beige";
            //Zeichne den screenbereich
            EisDealer.crc2.fillRect(x, y, 160, 200);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(x + 80, y + 125, 70, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "#ff6961";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "20px Arial";
            EisDealer.crc2.fillText("Your selection:", x + 10, y + 45);
            // Eis Schüssel zeichnen
            EisDealer.crc2.beginPath();
            EisDealer.crc2.fillStyle = "#f5deb3";
            EisDealer.crc2.fill();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(x + 15, y + 120);
            EisDealer.crc2.lineTo(x + 15, y + 160);
            EisDealer.crc2.lineTo(x + 140, y + 160);
            EisDealer.crc2.lineTo(x + 140, y + 120);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.fill();
            const patternY = y + 140;
            this.drawFloralPattern(x + 20, patternY);
            this.drawFloralPattern(x + 50, patternY);
            this.drawFloralPattern(x + 80, patternY);
            this.drawFloralPattern(x + 110, patternY);
            EisDealer.crc2.restore();
            // Zeichne die Kugeln in einer Pyramidenform
            const centerX = x + 80;
            const baseY = y + 120;
            const radius = 20;
            const positions = [
                [new EisDealer.Vector(centerX, baseY - radius)],
                [
                    new EisDealer.Vector(centerX - radius, baseY),
                    new EisDealer.Vector(centerX + radius, baseY)
                ],
                [
                    new EisDealer.Vector(centerX - radius * 2, baseY + radius),
                    new EisDealer.Vector(centerX, baseY + radius),
                    new EisDealer.Vector(centerX + radius * 2, baseY + radius)
                ]
            ];
            //Auswahl zeichnen
            this.scoops.forEach((scoop, index) => {
                const row = Math.floor((-1 + Math.sqrt(1 + 8 * index)) / 2);
                const col = index - row * (row + 1) / 2;
                const position = positions[row][col];
                scoop.drawSymbol(position);
                // Sauce zeichnen wenn soße ausgewählt ist
                if (this.selectedSauce) {
                    this.selectedSauce.drawSymbol(position);
                }
                // Topping zeichnen wenn Topping ausgewählt ist
                if (this.selectedTopping) {
                    this.selectedTopping.drawSymbol(position);
                }
            });
            EisDealer.crc2.restore();
        }
        // Methode zum zeichnen des Musters auf der Schüssel
        drawFloralPattern(x, y) {
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(x, y);
            EisDealer.crc2.lineTo(x + 10, y - 10);
            EisDealer.crc2.lineTo(x + 20, y);
            EisDealer.crc2.lineTo(x + 10, y + 10);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fill();
        }
    }
    EisDealer.SelectionScreen = SelectionScreen;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=SelectionScreen.js.map
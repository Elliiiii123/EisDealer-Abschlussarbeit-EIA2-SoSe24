"use strict";
var EisDealer;
(function (EisDealer) {
    class OrderScreen extends EisDealer.Drawable {
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
        //Items hinzufügen udn zeichnen
        addItem(item) {
            if (item instanceof EisDealer.Scoop) {
                this.scoops.push(item);
            }
            else if (item instanceof EisDealer.Sauce) {
                this.selectedSauce = item;
            }
            else if (item instanceof EisDealer.Topping) {
                this.selectedTopping = item;
                this.draw();
            }
        }
        //Itmes aus orderscreen löschen
        clearItems() {
            this.scoops = [];
            this.selectedSauce = null;
            this.selectedTopping = null;
            this.draw();
        }
        //Erhalte die Bestllung
        getOrder() {
            return {
                _scoops: this.scoops,
                _topping: this.selectedTopping,
                _sauce: this.selectedSauce
            };
        }
        // Zeichne den Screen
        draw() {
            const x = this.position.x;
            const y = this.position.y;
            EisDealer.crc2.save();
            EisDealer.crc2.fillStyle = "beige";
            EisDealer.crc2.fillRect(x, y, 160, 200);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(x + 80, y + 125, 70, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "#bff461";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Text
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "20px Arial";
            EisDealer.crc2.fillText("Current Order:", x + 10, y + 45);
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
            this.scoops.forEach((scoop, index) => {
                const row = Math.floor((-1 + Math.sqrt(1 + 8 * index)) / 2);
                const col = index - row * (row + 1) / 2;
                const position = positions[row][col];
                scoop.drawSymbol(position);
                // Zeichne Saucen wenn ausgewählt
                if (this.selectedSauce) {
                    this.selectedSauce.drawSymbol(position);
                }
                // Zeichne Toppings wenn ausgewählt
                if (this.selectedTopping) {
                    this.selectedTopping.drawSymbol(position);
                }
            });
            EisDealer.crc2.restore();
        }
        // Methode zum zeichnen des musters
        drawFloralPattern(x, y) {
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(x, y);
            EisDealer.crc2.lineTo(x + 10, y - 10);
            EisDealer.crc2.lineTo(x + 20, y);
            EisDealer.crc2.lineTo(x + 10, y + 10);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#ffb6c1";
            EisDealer.crc2.fill();
        }
    }
    EisDealer.OrderScreen = OrderScreen;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=OrderScreen.js.map
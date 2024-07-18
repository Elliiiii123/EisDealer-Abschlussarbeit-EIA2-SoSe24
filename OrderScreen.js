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
        clearItems() {
            this.scoops = [];
            this.selectedSauce = null;
            this.selectedTopping = null;
            this.draw();
        }
        getOrder() {
            return {
                scoops: this.scoops,
                topping: this.selectedTopping,
                sauce: this.selectedSauce
            };
        }
        draw() {
            const x = this.position.x;
            const y = this.position.y;
            // Clear previous content
            EisDealer.crc2.save();
            EisDealer.crc2.fillStyle = "beige";
            EisDealer.crc2.fillRect(x, y, 160, 200); // Draw a beige 200x200 area for the screen
            // Draw background green circle
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(x + 80, y + 125, 70, 0, 2 * Math.PI); // Adjust radius and position as needed
            EisDealer.crc2.fillStyle = "#bff461";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Draw text "Your selection:"
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "20px Arial";
            EisDealer.crc2.fillText("Current Order:", x + 10, y + 45);
            // Draw a simple bowl shape
            EisDealer.crc2.beginPath();
            EisDealer.crc2.fillStyle = "#f5deb3"; // BurlyWood color
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
            // Draw floral patterns or other decorations below the bowl
            const patternY = y + 140; // Position 20 pixels below the bowl
            // Example floral patterns (adjust as needed)
            this.drawFloralPattern(x + 20, patternY);
            this.drawFloralPattern(x + 50, patternY);
            this.drawFloralPattern(x + 80, patternY);
            this.drawFloralPattern(x + 110, patternY);
            EisDealer.crc2.restore();
            // Zeichne die Kugeln in einer Pyramidenform
            const centerX = x + 80; // Center X of the bowl
            const baseY = y + 120; // Base Y of the bowl (where it ends horizontally)
            const radius = 20;
            // Positions for each row of scoops
            const positions = [
                [new EisDealer.Vector(centerX, baseY - radius)], // Row 1 (top row)
                [
                    new EisDealer.Vector(centerX - radius, baseY), // Row 2
                    new EisDealer.Vector(centerX + radius, baseY)
                ],
                [
                    new EisDealer.Vector(centerX - radius * 2, baseY + radius), // Row 3
                    new EisDealer.Vector(centerX, baseY + radius),
                    new EisDealer.Vector(centerX + radius * 2, baseY + radius)
                ]
            ];
            let scoopIndex = 0;
            this.scoops.forEach((scoop) => {
                if (scoopIndex < positions.length) {
                    const row = positions[scoopIndex];
                    row.forEach(position => {
                        scoop.drawSymbol(position);
                        if (this.selectedSauce) {
                            this.selectedSauce.drawSymbol(position);
                        }
                        if (this.selectedTopping) {
                            this.selectedTopping.drawSymbol(position);
                        }
                    });
                    scoopIndex++;
                }
            });
            EisDealer.crc2.restore();
        }
        // Helper method to draw a floral pattern
        drawFloralPattern(x, y) {
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(x, y);
            EisDealer.crc2.lineTo(x + 10, y - 10);
            EisDealer.crc2.lineTo(x + 20, y);
            EisDealer.crc2.lineTo(x + 10, y + 10);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#ffb6c1"; // LightPink color
            EisDealer.crc2.fill();
        }
    }
    EisDealer.OrderScreen = OrderScreen;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=OrderScreen.js.map
"use strict";
var EisDealer;
(function (EisDealer) {
    class SelectionScreen extends EisDealer.Drawable {
        selectedSauce;
        selectedToppings;
        //private selectedItems: (Scoop | Sauce | Topping)[];
        scoops;
        constructor(_position) {
            super(_position);
            this.selectedSauce = null;
            this.selectedToppings = [];
            //this.selectedItems = [];
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
                // Check if the topping is already selected
                if (!this.selectedToppings.includes(item)) {
                    this.selectedToppings.push(item);
                }
            }
            this.draw();
        }
        clearItems() {
            this.scoops = [];
            this.selectedSauce = null;
            this.selectedToppings = [];
            this.draw();
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
            EisDealer.crc2.fillStyle = "#ff6961";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Draw text "Your selection:"
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "20px Arial";
            EisDealer.crc2.fillText("Your selection:", x + 10, y + 45);
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
            // Draw the ice cream scoops in a pyramid form
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
            this.scoops.forEach((scoop, index) => {
                const row = Math.floor((-1 + Math.sqrt(1 + 8 * index)) / 2);
                const col = index - row * (row + 1) / 2;
                const position = positions[row][col];
                scoop.drawSymbol(position);
                // Draw sauce on the scoop if a sauce is selected
                if (this.selectedSauce) {
                    this.selectedSauce.drawSymbol(position);
                }
                // Draw toppings on the scoop if toppings are selected
                this.selectedToppings.forEach(topping => {
                    topping.drawSymbol(position);
                });
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
    EisDealer.SelectionScreen = SelectionScreen;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=SelectionScreen.js.map
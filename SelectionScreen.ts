namespace EisDealer{
    export class SelectionScreen extends Drawable{
        private selectedSauce: Sauce | null;
        private selectedToppings: Topping[];
        //private selectedItems: (Scoop | Sauce | Topping)[];
        private scoops: Scoop[];


        constructor(_position: Vector) {
            super(_position);
            this.selectedSauce = null;
            this.selectedToppings = [];
            //this.selectedItems = [];
            this.scoops = [];
            this.draw();
        }

        public addItem(item: Scoop | Sauce |Topping): void {
            if (item instanceof Scoop) {
                this.scoops.push(item);
            } else if (item instanceof Sauce) {
                this.selectedSauce = item;
            } else if (item instanceof Topping) {
                // Check if the topping is already selected
                if (!this.selectedToppings.includes(item)) {
                    this.selectedToppings.push(item);
                }
            }    
            this.draw();
        }

        public clearItems(): void {
            this.scoops = [];
            this.selectedSauce = null;
            this.selectedToppings = [];
            this.draw();
        }

        public draw(): void {
            const x = this.position.x;
            const y = this.position.y;

            // Clear previous content
            crc2.save();
            crc2.fillStyle = "beige";
            crc2.fillRect(x, y, 160, 200); // Draw a beige 200x200 area for the screen

            // Draw background green circle
            crc2.beginPath();
            crc2.arc(x + 80, y + 125, 70, 0, 2 * Math.PI); // Adjust radius and position as needed
            crc2.fillStyle = "#ff6961";
            crc2.fill();
            crc2.closePath();

            // Draw text "Your selection:"
            crc2.fillStyle = "black";
            crc2.font = "20px Arial";
            crc2.fillText("Your selection:", x + 10, y + 45);

            // Draw a simple bowl shape
            crc2.beginPath();
            crc2.fillStyle = "#f5deb3"; // BurlyWood color
            crc2.fill();
            crc2.beginPath();
            crc2.moveTo(x + 15, y + 120);
            crc2.lineTo(x + 15, y + 160);
            crc2.lineTo(x + 140, y + 160);
            crc2.lineTo(x + 140, y + 120);
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();
            crc2.fill();

            // Draw floral patterns or other decorations below the bowl
            const patternY = y + 140; // Position 20 pixels below the bowl

            // Example floral patterns (adjust as needed)
            this.drawFloralPattern(x + 20, patternY);
            this.drawFloralPattern(x + 50, patternY);
            this.drawFloralPattern(x + 80, patternY);
            this.drawFloralPattern(x + 110, patternY);

            crc2.restore();

            // Zeichne die Kugeln in einer Pyramidenform
            // Draw the ice cream scoops in a pyramid form
            const centerX = x + 80; // Center X of the bowl
            const baseY = y + 120; // Base Y of the bowl (where it ends horizontally)
            const radius = 20;

            // Positions for each row of scoops
            const positions = [
                [new Vector(centerX, baseY - radius)], // Row 1 (top row)
                [
                    new Vector(centerX - radius, baseY), // Row 2
                    new Vector(centerX + radius, baseY)
                ],
                [
                    new Vector(centerX - radius * 2, baseY + radius), // Row 3
                    new Vector(centerX, baseY + radius),
                    new Vector(centerX + radius * 2, baseY + radius)
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
            crc2.restore();
        }

        // Helper method to draw a floral pattern
        private drawFloralPattern(x: number, y: number): void {
            crc2.beginPath();
            crc2.moveTo(x, y);
            crc2.lineTo(x + 10, y - 10);
            crc2.lineTo(x + 20, y);
            crc2.lineTo(x + 10, y + 10);
            crc2.closePath();
            crc2.fillStyle = "#ffb6c1"; // LightPink color
            crc2.fill();
        }
    }
}

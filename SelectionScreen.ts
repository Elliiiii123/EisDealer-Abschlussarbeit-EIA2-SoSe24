namespace EisDealer{
    export class SelectionScreen extends Drawable{
        private selectedSauce: Sauce | null;
        private selectedTopping: Topping | null;
        private scoops: Scoop[];

        constructor(_position: Vector) {
            super(_position);
            this.selectedSauce = null;
            this.selectedTopping = null;
            this.scoops = [];
            this.draw();
        }

        //Methode um die ausgewählten Items in dem selection screen anzuzeigen
        public addItem(item: Scoop | Sauce |Topping): void {
            if (item instanceof Scoop) {
                this.scoops.push(item);
            } else if (item instanceof Sauce) {
                this.selectedSauce = item;
            } else if (item instanceof Topping) {
                this.selectedTopping = item;
            }    
            this.draw();
        }

        //Methode um screen wieder zu leeren
        public clearItems(): void {
            this.scoops = [];
            this.selectedSauce = null;
            this.selectedTopping = null;
            this.draw();
        }

        // die erhaltenen Items werden gesettet
        public getSelection(): { scoops: Scoop[], topping: Topping | null, sauce: Sauce | null } {
            return {
                scoops: this.scoops,
                topping: this.selectedTopping,
                sauce: this.selectedSauce
            };
        }

        //Zeichne den Selection screen mit der entsprechenden auswahl
        public draw(): void {
            const x = this.position.x;
            const y = this.position.y;

            crc2.save();
            crc2.fillStyle = "beige";
            //Zeichne den screenbereich
            crc2.fillRect(x, y, 160, 200); 

            crc2.beginPath();
            crc2.arc(x + 80, y + 125, 70, 0, 2 * Math.PI);
            crc2.fillStyle = "#ff6961";
            crc2.fill();
            crc2.closePath();

            crc2.fillStyle = "black";
            crc2.font = "20px Arial";
            crc2.fillText("Your selection:", x + 10, y + 45);

            // Eis Schüssel zeichnen
            crc2.beginPath();
            crc2.fillStyle = "#f5deb3"; 
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

            const patternY = y + 140; 

            this.drawFloralPattern(x + 20, patternY);
            this.drawFloralPattern(x + 50, patternY);
            this.drawFloralPattern(x + 80, patternY);
            this.drawFloralPattern(x + 110, patternY);

            crc2.restore();

            // Zeichne die Kugeln in einer Pyramidenform
            const centerX = x + 80; 
            const baseY = y + 120; 
            const radius = 20;

            const positions = [
                [new Vector(centerX, baseY - radius)], 
                [
                    new Vector(centerX - radius, baseY), 
                    new Vector(centerX + radius, baseY)
                ],
                [
                    new Vector(centerX - radius * 2, baseY + radius), 
                    new Vector(centerX, baseY + radius),
                    new Vector(centerX + radius * 2, baseY + radius)
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
            crc2.restore();
        }

        // Methode zum zeichnen des Musters auf der Schüssel
        private drawFloralPattern(x: number, y: number): void {
            crc2.beginPath();
            crc2.moveTo(x, y);
            crc2.lineTo(x + 10, y - 10);
            crc2.lineTo(x + 20, y);
            crc2.lineTo(x + 10, y + 10);
            crc2.closePath();
            crc2.fill();
        }
    }
}

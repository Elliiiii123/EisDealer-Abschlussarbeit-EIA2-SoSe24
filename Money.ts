namespace EisDealer {
    export class Money extends Drawable{
        private totalPrice: number = 0; // Am anfang ist Kontostand auf 0€
        constructor(_position: Vector){
            super(_position);
        }

        //Zeichne die Geldanzeige
        public draw():void {
            const x = this.position.x;
            const y = this.position.y;

            crc2.save();
            crc2.fillStyle = "beige";
            crc2.fillRect(x, y, 160, 50); 

            // Zeige den aktuellen Gesamtpreis
            crc2.fillStyle = "black";
            crc2.font = "20px Arial";
            crc2.fillText("Money: $"+ this.totalPrice.toFixed(2), x + 10, y + 30);

            crc2.restore();
        }

        //Methode zum addieren der Preise
        public addToTotal(price: number): void {
            this.totalPrice += price;
            this.draw();
        }

        public getTotalPrice(): number {
            return this.totalPrice;
        }

        public resetTotal(): void {
            this.totalPrice = 0;
            this.draw();
        }
    }
}
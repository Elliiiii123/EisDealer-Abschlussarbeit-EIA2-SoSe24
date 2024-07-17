namespace EisDealer {
    export class Dealer extends Moveable{

        public type: DealerType;
        private originalPosition: Vector;
        private targetPosition: Vector | null = null;
        public selectedScoop: Scoop | null = null;
        public selectedToppings: Topping[] = [];
        public selectedSauce: Sauce | null = null;
        private itemSelected: boolean = false; // Flag, um zu prüfen, ob ein Item ausgewählt wurde
        public customerClicked: boolean = false;  // Neue Eigenschaft
        private itemClickedFirst: boolean = false; // Flag, um zu prüfen, ob zuerst ein Item geklickt wurde
        private customerClickedAfterItem: boolean = false; // Flag, um zu prüfen, ob der Kunde nach dem Item geklickt wurde

        constructor (_position: Vector, _speed: Vector, _direction: Vector, _type: DealerType, _emotion: string){
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction)
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            this.originalPosition = new Vector(_position.x, _position.y);
            this.type = _type;
        }
        
        public handleClicked():void{

        }

        public handleCustomerClick(): void {
            this.customerClicked = true;
            this.customerClickedAfterItem = this.itemClickedFirst;
            this.updateDealerType();
        }

        public setSelectedScoop(scoop: Scoop): void {
            this.selectedScoop = scoop;
            this.itemSelected = true;
            this.itemClickedFirst = true;
            this.updateDealerType();
        }

        public handleItemClick(): void {
            this.itemSelected = true;
            this.itemClickedFirst = true;
            this.updateDealerType();
        }

        public addSelectedTopping(topping: Topping): void {
            if (!this.selectedToppings.includes(topping)) {
                this.selectedToppings.push(topping);
                this.itemSelected = true;
                this.itemClickedFirst = true;
                this.updateDealerType();
            }
        }

        public setSelectedSauce(sauce: Sauce): void {
            this.selectedSauce = sauce;
            this.itemSelected = true;
            this.itemClickedFirst = true;
            this.updateDealerType();
        }

        public setTargetPosition(position: Vector): void {
            this.targetPosition = new Vector(position.x, position.y);
        }

        public moveToOriginalPosition(): void {
            this.targetPosition = new Vector(this.originalPosition.x, this.originalPosition.y);
        }

        public move(): void {

            if (this.targetPosition) {
                const dx = this.targetPosition.x - this.position.x;
                const dy = this.targetPosition.y - this.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1) {
                    const moveX = (dx / distance) * this.speed.x;
                    const moveY = (dy / distance) * this.speed.y;
                    this.position.x += moveX;
                    this.position.y += moveY;
                } else {
                    this.position = this.targetPosition;
                    this.targetPosition = null; // Ziel erreicht
                    this.checkStateChange();
                }
            }
        }

        private checkStateChange(): void {
            if (this.type === DealerType.withIce && this.customerClicked) {
                this.type = DealerType.withoutIce;
                this.resetFlags();
            }
        }

        public updateDealerType(): void {
            if (this.itemClickedFirst && this.customerClickedAfterItem) {
                if (this.selectedScoop || this.selectedToppings.length > 0 || this.selectedSauce) {
                    if (this.type !== DealerType.withIce) {
                        this.type = DealerType.withIce;
                    }
                } else {
                    if (this.type !== DealerType.withoutIce) {
                        this.type = DealerType.withoutIce;
                    }
                }
            }
        }

        // Methode zum Zurücksetzen der Variablen nach einer Aktion (z.B. Bestellung abschließen)
        public resetFlags(): void {
            this.itemClickedFirst = false;
            this.customerClickedAfterItem = false;
            this.itemSelected = false;
            this.customerClicked = false;
            this.selectedScoop = null;
            this.selectedToppings = [];
            this.selectedSauce = null;
            this.type = DealerType.withoutIce;
        }
    
        public draw():void{
            //console.log("Dealer draw")
            switch (this.type) {
                case DealerType.withIce:
                    this.withIce();
                    //console.log("type changed to withIce")
                    break;

                case DealerType.withoutIce:
                    this.withoutIce();

                    break;
                default:console.error("Unknown type");
                    break;
            }
        }

        private withoutIce():void{
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 30;

            // Zeichne die Haare
            crc2.beginPath();
            crc2.arc(centerX, centerY+5, 45, 0, Math.PI, true);
            crc2.fillStyle = "brown";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            // Zeichne den Kopf
            crc2.save();
            crc2.beginPath();
            crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 15;
            const eyeOffsetY = 9;

            // Linkes Auge
            crc2.beginPath();
            crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Rechtes Auge
            crc2.beginPath();
            crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

                // Zeichne die Brille - Linkes Glas
                crc2.beginPath();
                crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 1;
                crc2.stroke();
                crc2.closePath();

                // Zeichne die Brille - Rechtes Glas
                crc2.beginPath();
                crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 1;
                crc2.stroke();
                crc2.closePath();

                // Zeichne die Brillenverbindung
                crc2.beginPath();
                crc2.moveTo(centerX - eyeOffsetX + eyeRadius + 5, centerY - eyeOffsetY);
                crc2.lineTo(centerX + eyeOffsetX - eyeRadius - 5, centerY - eyeOffsetY);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.stroke();
                crc2.closePath();

            // Zeichne die Knubbelnase
            crc2.beginPath();
            crc2.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            crc2.fillStyle = "orange";
            crc2.fill();
            crc2.closePath();

            // Zeichne den Mund
            crc2.beginPath();
            crc2.arc(centerX, centerY + 8, 10, 0, Math.PI, false);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Haare
            crc2.beginPath();
            crc2.arc(centerX, centerY-25, 20, 0, Math.PI, true);
            crc2.fillStyle = "brown";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

        }

        private withIce():void{
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 30;

            // Zeichne die Haare
            crc2.beginPath();
            crc2.arc(centerX, centerY+5, 45, 0, Math.PI, true);
            crc2.fillStyle = "brown";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            // Zeichne den Kopf
            crc2.save();
            crc2.beginPath();
            crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 15;
            const eyeOffsetY = 9;

            // Linkes Auge
            crc2.beginPath();
            crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Rechtes Auge
            crc2.beginPath();
            crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

                // Zeichne die Brille - Linkes Glas
                crc2.beginPath();
                crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 1;
                crc2.stroke();
                crc2.closePath();

                // Zeichne die Brille - Rechtes Glas
                crc2.beginPath();
                crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 1;
                crc2.stroke();
                crc2.closePath();

                // Zeichne die Brillenverbindung
                crc2.beginPath();
                crc2.moveTo(centerX - eyeOffsetX + eyeRadius + 5, centerY - eyeOffsetY);
                crc2.lineTo(centerX + eyeOffsetX - eyeRadius - 5, centerY - eyeOffsetY);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.stroke();
                crc2.closePath();

            // Zeichne die Knubbelnase
            crc2.beginPath();
            crc2.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            crc2.fillStyle = "orange";
            crc2.fill();
            crc2.closePath();

            // Zeichne den Mund
            crc2.beginPath();
            crc2.arc(centerX, centerY + 8, 10, 0, Math.PI, false);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Haare
            crc2.beginPath();
            crc2.arc(centerX, centerY-25, 20, 0, Math.PI, true);
            crc2.fillStyle = "brown";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            // Zeichne die Schüssel unten rechts mit floralem Muster
            const bowlX = centerX + 5;
            const bowlY = centerY - 100;

            // Schüssel
            crc2.beginPath();
            crc2.moveTo(bowlX + 15, bowlY + 120);
            crc2.lineTo(bowlX + 15, bowlY + 135);
            crc2.lineTo(bowlX + 55, bowlY + 135);
            crc2.lineTo(bowlX + 55, bowlY + 120);
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();
            crc2.fillStyle = "#f5deb3"; // BurlyWood color
            crc2.fill();

            // Florales Muster
            const patternY = bowlY + 128; // Position 20 pixels below the bowl
            this.drawFloralPattern(bowlX + 20, patternY);
            this.drawFloralPattern(bowlX + 30, patternY);
            this.drawFloralPattern(bowlX + 40, patternY);

            crc2.restore();

            // Zeichne drei bunte Kugeln in der Schüssel in Pyramidenform
            const scoopRadius = 10;
            const scoopColors = ["#ff6347", "#add8e6", "#90ee90"]; // Tomatenrot, Hellblau, Hellgrün
            const scoopPositions = [
                { x: bowlX + 35, y: bowlY + 110 },   // obere mittlere Kugel
                { x: bowlX + 25, y: bowlY + 120 },  // untere linke Kugel
                { x: bowlX + 45, y: bowlY + 120 },  // untere rechte Kugel
                
            ];

            scoopPositions.forEach((pos, index) => {
                crc2.beginPath();
                crc2.arc(pos.x, pos.y, scoopRadius, 0, 2 * Math.PI);
                crc2.fillStyle = scoopColors[index];
                crc2.fill();
                crc2.lineWidth = 1;
                crc2.closePath();
            });

        }
        // Helper method to draw a floral pattern
        private drawFloralPattern(x: number, y: number): void {
            crc2.beginPath();
            crc2.moveTo(x, y);
            crc2.lineTo(x + 5, y - 5);
            crc2.lineTo(x + 10, y);
            crc2.lineTo(x + 5, y + 5);
            crc2.closePath();
            crc2.fillStyle = "#ffb6c1"; // LightPink color
            crc2.fill();
        }


    }
}
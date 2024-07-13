namespace EisDealer {
    export class Customer extends Moveable{

        // private type: CustomerType;
        // private emotion: string;
        private targetPosition: Vector | null = null;
        private static targetPositions: Vector[] = [
            new Vector(295, 235),
            new Vector(262, 173),
            new Vector(370, 255),
            new Vector(190, 30),
            new Vector(220, 90),
            new Vector(180, 175),
            new Vector(225, 220),
            new Vector(350, 200),
            new Vector(250, 35),
            new Vector(290, 60),
            new Vector(343, 30),
            new Vector(345, 97),
        ]
        
        constructor (_position: Vector, _speed: Vector, _direction: Vector, _type: EisDealer.CustomerType, _emotion: string){
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction)
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            // this.type = _type;
            // this.emotion = _emotion;
            this.findNextTargetPosition(); // Initial Target setzen
        }

        public setPosition(position: Vector): void {
            this.position = position;
        }
        
        public handleClicked(): void {

        }

        public move(): void {
            if (!this.targetPosition) return;
        
            const goalPosition = this.targetPosition; // Zielkoordinate
            const passingPoint = new Vector(417, 115); // Punkt, den der Customer passieren soll
        
            // Berechne die Distanz zum Ziel und zum Passierpunkt
            const distanceToGoal = this.position.distanceTo(goalPosition);
            const distanceToPassingPoint = this.position.distanceTo(passingPoint);
        
            // Bewegung in Richtung Zielkoordinate oder Passierpunkt je nach Entfernung
            if (distanceToPassingPoint > 1) {
                // Bewege zum Passierpunkt (417, 115)
                const dxToPassingPoint = passingPoint.x - this.position.x;
                const dyToPassingPoint = passingPoint.y - this.position.y;
                this.position.x += Math.sign(dxToPassingPoint);
                this.position.y += Math.sign(dyToPassingPoint);
            } else {
                // Bewege zur Zielkoordinate
                const dxToGoal = goalPosition.x - this.position.x;
                const dyToGoal = goalPosition.y - this.position.y;
                this.position.x += Math.sign(dxToGoal);
                this.position.y += Math.sign(dyToGoal);
        
                // Kunden erreichen das Ziel
                if (distanceToGoal <= 1) {
                    console.log("Customer reached the target position");
                    this.findNextTargetPosition(); // Nächstes Ziel setzen
                }
            }
        }

        private findNextTargetPosition(): void {
            const queueOffset = 30; // Offset zwischen den Kunden in der Warteschlange

            // Liste der verfügbaren Zielpositionen
            let availablePositions = Customer.targetPositions.filter(pos => !this.isPositionOccupied(pos));

            // Wenn keine freie Position gefunden wurde
            if (availablePositions.length === 0) {
                // Position im Bereich 420, 115 wählen, aber mit Anpassung des Offsets
                let basePosition = new Vector(420, 115);

                // Suche die nächste freie Position mit dem richtigen Offset
                let newPosition = basePosition;
                while (this.isPositionOccupied(newPosition)) {
                    newPosition = new Vector(newPosition.x, newPosition.y + queueOffset);
                }

                this.targetPosition = newPosition;
            } else {
                // Wähle die nächste Position in der Warteschlange basierend auf der Reihenfolge aus
                let nextPositionIndex = 0;
                for (let i = 0; i < Customer.targetPositions.length; i++) {
                    if (!this.isPositionOccupied(Customer.targetPositions[i])) {
                        nextPositionIndex = i;
                        break;
                    }
                }

                this.targetPosition = Customer.targetPositions[nextPositionIndex];
            }

            // Markiere die Zielposition als belegt
            this.markPositionAsOccupied(this.targetPosition);
        }

        private isPositionOccupied(position: Vector): boolean {
            // Überprüfe, ob die Zielposition bereits von einem anderen Kunden besetzt ist
            return allObjects.some(obj => {
                if (obj instanceof Customer && obj !== this) {
                    return obj.targetPosition && obj.targetPosition.equals(position);
                }
                return false;
            });
        }

        private markPositionAsOccupied(position: Vector): void {
            // Füge die Zielposition zur Liste der belegten Positionen hinzu
            Customer.targetPositions.push(position);
        }
    
    
    
        public draw():void{
            //console.log("Customer draw")
            this.drawNormal();
            this.drawHappy();
            this.drawSad();
            this.drawEat();
        }

        private drawNormal():void{
            //console.log("Customer draw")
            
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            crc2.beginPath();
            crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;

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

            // Zeichne den Mund
            crc2.beginPath();
            crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;

            // Linke Wange
            crc2.beginPath();
            crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "pink";
            crc2.fill();
            crc2.closePath();

            // Rechte Wange
            crc2.beginPath();
            crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "pink";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }

        private drawSad():void{

        }

        private drawHappy():void{
            
        }

        private drawEat():void{
            
        }
    }
}
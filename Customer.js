"use strict";
var EisDealer;
(function (EisDealer) {
    class Customer extends EisDealer.Moveable {
        // private type: CustomerType;
        // private emotion: string;
        targetPosition = null;
        static targetPositions = [
            new EisDealer.Vector(295, 235),
            new EisDealer.Vector(262, 173),
            new EisDealer.Vector(370, 255),
            new EisDealer.Vector(190, 30),
            new EisDealer.Vector(220, 90),
            new EisDealer.Vector(180, 175),
            new EisDealer.Vector(225, 220),
            new EisDealer.Vector(350, 200),
            new EisDealer.Vector(250, 35),
            new EisDealer.Vector(290, 60),
            new EisDealer.Vector(343, 30),
            new EisDealer.Vector(345, 97),
        ];
        constructor(_position, _speed, _direction, _type, _emotion) {
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction);
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            // this.type = _type;
            // this.emotion = _emotion;
            this.findNextTargetPosition(); // Initial Target setzen
        }
        setPosition(position) {
            this.position = position;
        }
        handleClicked() {
        }
        move() {
            if (!this.targetPosition)
                return;
            const goalPosition = this.targetPosition; // Zielkoordinate
            const passingPoint = new EisDealer.Vector(417, 115); // Punkt, den der Customer passieren soll
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
            }
            else {
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
        findNextTargetPosition() {
            const queueOffset = 30; // Offset zwischen den Kunden in der Warteschlange
            // Liste der verfügbaren Zielpositionen
            let availablePositions = Customer.targetPositions.filter(pos => !this.isPositionOccupied(pos));
            // Wenn keine freie Position gefunden wurde
            if (availablePositions.length === 0) {
                // Position im Bereich 420, 115 wählen, aber mit Anpassung des Offsets
                let basePosition = new EisDealer.Vector(420, 115);
                // Suche die nächste freie Position mit dem richtigen Offset
                let newPosition = basePosition;
                while (this.isPositionOccupied(newPosition)) {
                    newPosition = new EisDealer.Vector(newPosition.x, newPosition.y + queueOffset);
                }
                this.targetPosition = newPosition;
            }
            else {
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
        isPositionOccupied(position) {
            // Überprüfe, ob die Zielposition bereits von einem anderen Kunden besetzt ist
            return EisDealer.allObjects.some(obj => {
                if (obj instanceof Customer && obj !== this) {
                    return obj.targetPosition && obj.targetPosition.equals(position);
                }
                return false;
            });
        }
        markPositionAsOccupied(position) {
            // Füge die Zielposition zur Liste der belegten Positionen hinzu
            Customer.targetPositions.push(position);
        }
        draw() {
            //console.log("Customer draw")
            this.drawNormal();
            this.drawHappy();
            this.drawSad();
            this.drawEat();
        }
        drawNormal() {
            //console.log("Customer draw")
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;
            EisDealer.crc2.save();
            EisDealer.crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "yellow";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;
            // Linkes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechtes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;
            // Linke Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "pink";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechte Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "pink";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        drawSad() {
        }
        drawHappy() {
        }
        drawEat() {
        }
    }
    EisDealer.Customer = Customer;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Customer.js.map
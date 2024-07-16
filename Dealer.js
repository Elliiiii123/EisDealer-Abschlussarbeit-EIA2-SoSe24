"use strict";
var EisDealer;
(function (EisDealer) {
    class Dealer extends EisDealer.Moveable {
        type;
        originalPosition;
        targetPosition = null;
        selectedScoop = null;
        selectedToppings = [];
        selectedSauce = null;
        itemSelected = false; // Flag, um zu prüfen, ob ein Item ausgewählt wurde
        customerClicked = false; // Neue Eigenschaft
        constructor(_position, _speed, _direction, _type, _emotion) {
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction);
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            this.originalPosition = new EisDealer.Vector(_position.x, _position.y);
            this.type = _type;
        }
        handleClicked() {
        }
        setSelectedScoop(scoop) {
            this.selectedScoop = scoop;
            this.itemSelected = true;
            this.updateDealerType();
        }
        addSelectedTopping(topping) {
            if (!this.selectedToppings.includes(topping)) {
                this.selectedToppings.push(topping);
                this.itemSelected = true;
                this.updateDealerType();
            }
        }
        setSelectedSauce(sauce) {
            this.selectedSauce = sauce;
            this.itemSelected = true;
            this.updateDealerType();
        }
        setTargetPosition(position) {
            this.targetPosition = new EisDealer.Vector(position.x, position.y);
        }
        moveToOriginalPosition() {
            this.targetPosition = new EisDealer.Vector(this.originalPosition.x, this.originalPosition.y);
        }
        move() {
            if (this.targetPosition) {
                const dx = this.targetPosition.x - this.position.x;
                const dy = this.targetPosition.y - this.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1) {
                    const moveX = (dx / distance) * this.speed.x;
                    const moveY = (dy / distance) * this.speed.y;
                    this.position.x += moveX;
                    this.position.y += moveY;
                }
                else {
                    this.position = this.targetPosition;
                    this.targetPosition = null; // Ziel erreicht
                }
            }
        }
        // Interne Methode zum Aktualisieren des Dealer-Typs
        updateDealerType() {
            if (this.customerClicked && this.itemSelected) {
                if (this.selectedScoop || this.selectedToppings.length > 0 || this.selectedSauce) {
                    this.type = EisDealer.DealerType.withIce;
                }
                else {
                    this.type = EisDealer.DealerType.withoutIce;
                }
            }
        }
        draw() {
            //console.log("Dealer draw")
            switch (this.type) {
                case EisDealer.DealerType.withIce:
                    this.withIce();
                    console.log("type changed to withIce");
                    break;
                case EisDealer.DealerType.withoutIce:
                    this.withoutIce();
                    break;
                default:
                    console.error("Unknown type");
                    break;
            }
            // this.withoutIce();
            // this.withIce();
        }
        withoutIce() {
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 30;
            // Zeichne die Haare
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 5, 45, 0, Math.PI, true);
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne den Kopf
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "yellow";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 15;
            const eyeOffsetY = 9;
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
            // Zeichne die Brille - Linkes Glas
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Brille - Rechtes Glas
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Brillenverbindung
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX - eyeOffsetX + eyeRadius + 5, centerY - eyeOffsetY);
            EisDealer.crc2.lineTo(centerX + eyeOffsetX - eyeRadius - 5, centerY - eyeOffsetY);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Knubbelnase
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "orange";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 8, 10, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Haare
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY - 25, 20, 0, Math.PI, true);
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        withIce() {
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 30;
            // Zeichne die Haare
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 5, 45, 0, Math.PI, true);
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne den Kopf
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "yellow";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 15;
            const eyeOffsetY = 9;
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
            // Zeichne die Brille - Linkes Glas
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Brille - Rechtes Glas
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Brillenverbindung
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX - eyeOffsetX + eyeRadius + 5, centerY - eyeOffsetY);
            EisDealer.crc2.lineTo(centerX + eyeOffsetX - eyeRadius - 5, centerY - eyeOffsetY);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Knubbelnase
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "orange";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 8, 10, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Haare
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY - 25, 20, 0, Math.PI, true);
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne die Schüssel unten rechts mit floralem Muster
            const bowlX = centerX + 5;
            const bowlY = centerY - 100;
            // Schüssel
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(bowlX + 15, bowlY + 120);
            EisDealer.crc2.lineTo(bowlX + 15, bowlY + 135);
            EisDealer.crc2.lineTo(bowlX + 55, bowlY + 135);
            EisDealer.crc2.lineTo(bowlX + 55, bowlY + 120);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#f5deb3"; // BurlyWood color
            EisDealer.crc2.fill();
            // Florales Muster
            const patternY = bowlY + 128; // Position 20 pixels below the bowl
            this.drawFloralPattern(bowlX + 20, patternY);
            this.drawFloralPattern(bowlX + 30, patternY);
            this.drawFloralPattern(bowlX + 40, patternY);
            EisDealer.crc2.restore();
            // Zeichne drei bunte Kugeln in der Schüssel in Pyramidenform
            const scoopRadius = 10;
            const scoopColors = ["#ff6347", "#add8e6", "#90ee90"]; // Tomatenrot, Hellblau, Hellgrün
            const scoopPositions = [
                { x: bowlX + 35, y: bowlY + 110 }, // obere mittlere Kugel
                { x: bowlX + 25, y: bowlY + 120 }, // untere linke Kugel
                { x: bowlX + 45, y: bowlY + 120 }, // untere rechte Kugel
            ];
            scoopPositions.forEach((pos, index) => {
                EisDealer.crc2.beginPath();
                EisDealer.crc2.arc(pos.x, pos.y, scoopRadius, 0, 2 * Math.PI);
                EisDealer.crc2.fillStyle = scoopColors[index];
                EisDealer.crc2.fill();
                EisDealer.crc2.lineWidth = 1;
                EisDealer.crc2.closePath();
            });
        }
        // Helper method to draw a floral pattern
        drawFloralPattern(x, y) {
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(x, y);
            EisDealer.crc2.lineTo(x + 5, y - 5);
            EisDealer.crc2.lineTo(x + 10, y);
            EisDealer.crc2.lineTo(x + 5, y + 5);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#ffb6c1"; // LightPink color
            EisDealer.crc2.fill();
        }
    }
    EisDealer.Dealer = Dealer;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Dealer.js.map
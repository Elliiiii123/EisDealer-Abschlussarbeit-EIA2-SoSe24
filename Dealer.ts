namespace EisDealer {
    export class Dealer extends Moveable{

        // private type: DealerType;
        private originalPosition: Vector;
        private targetPosition: Vector | null = null;

        constructor (_position: Vector, _speed: Vector, _direction: Vector, _type: DealerType, _emotion: string){
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction)
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            this.originalPosition = new Vector(_position.x, _position.y);
            // this.type = _type;
        }
        
        public handleClicked():void{

        }

        public setTargetPosition(position: Vector): void {
            this.targetPosition = new Vector(position.x, position.y);
        }

        public moveToOriginalPosition(): void {
            this.targetPosition = new Vector(this.originalPosition.x, this.originalPosition.y);
        }

        protected move(): void {

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
                }
            }
        }
    
        public draw():void{
            //console.log("Dealer draw")
            this.withoutIce();
            this.withIce();
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

        }

    }
}
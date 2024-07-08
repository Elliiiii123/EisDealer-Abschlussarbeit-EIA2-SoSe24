namespace EisDealer {
    export class Customer extends Moveable{

        private type: CustomerType;
        private emotion: string;

        constructor (_position: Vector, _speed: Vector, _direction: Vector, _type: EisDealer.CustomerType, _emotion: string){
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction)
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            this.type = _type;
            this.emotion = _emotion;
        }
        
        public handleClicked():void{

        }

        protected move(): void {
            
        }
    
        protected draw():void{
            //console.log("Customer draw")
            this.drawNormal();
            this.drawHappy();
            this.drawSad();
            this.drawEat();
            }

        private drawNormal():void{
            console.log("Customer draw")
            
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
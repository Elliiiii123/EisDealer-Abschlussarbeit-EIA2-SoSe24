namespace EisDealer {
    export class Customer extends Moveable{

        private type: CustomerType;
        private emotion: string;
        private targetChair: Chair | null = null; 
        private allObjects: Drawable[];

        

        constructor (_position: Vector, _speed: Vector, _direction: Vector, _type: EisDealer.CustomerType, _emotion: string){
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction)
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            this.type = _type;
            this.emotion = _emotion;
            this.targetChair = null;
            this.allObjects = allObjects;

        }
        
        public handleClicked(): void {

        }

        public move(): void {
            

            console.log("customer move");
            if (!this.targetChair || this.targetChair.isOccupied()) {
                this.findNextUnoccupiedChair();
            }

            if (this.targetChair) {
                const dx = this.targetChair.position.x - this.position.x + 50;
                const dy = this.targetChair.position.y - this.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const moveDistance = Math.min(this.speed.x, distance);

                this.position.x += (dx / distance) * moveDistance;
                this.position.y += (dy / distance) * moveDistance;

                if (distance < this.speed.x) {
                    this.targetChair.occupy();
                    this.speed = new Vector(0, 0);
                    this.targetChair = null;
                }
            }
        }

        private findNextUnoccupiedChair(): void {
            for (const obj of this.allObjects) {
                if (obj instanceof Chair && !obj.isOccupied()) {
                    this.targetChair = obj;
                    break;
                }
            }
        }

        // private isColliding(position: Vector): boolean {

        //     // Definiere die Bereiche, in denen die Customer nicht laufen können
        //     const noWalkAreas = [
        //         { x: 0, y: 100, width: 300, height: 350 }, // Thekenbereich
        //         { x: 440 - 45, y: 100 - 45, width: 90, height: 90 }, // Tisch 1
        //         { x: 650 - 45, y: 120 - 45, width: 90, height: 90 }, // Tisch 2
        //         { x: 450 - 45, y: 370 - 45, width: 90, height: 90 }, // Tisch 3
        //         { x: 670 - 45, y: 470 - 45, width: 90, height: 90 }, // Tisch 4
        //         // Weitere Bereiche hinzufügen
        //     ];

        //     // Prüfe auf Kollision mit den noWalkAreas
        //     for (let area of noWalkAreas) {
        //         if (position.x > area.x && position.x < area.x + area.width &&
        //             position.y > area.y && position.y < area.y + area.height) {
        //             return true;
        //         }
        //     }

        //     return false;
        // }
    
        protected draw():void{
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
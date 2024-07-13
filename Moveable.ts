namespace EisDealer {
    export abstract class Moveable extends Drawable{
        protected direction: Vector;
        protected speed: Vector;

        constructor (_position: Vector,_speed: Vector, _direction: Vector){
            //console.log("Duck Constructor")
            super(_position);
            this.position = _position;
            this.direction = _direction;
            this.speed = _speed;
        }
    
        protected move():void {
            let newPosition = this.position.add(this.speed);

            // Check for canvas boundaries
            if (newPosition.x < 0 || newPosition.x > crc2.canvas.width) {
                this.speed.x *= -1;
            }
            if (newPosition.y < 0 || newPosition.y > crc2.canvas.height) {
                this.speed.y *= -1;
            }

            this.position = this.position.add(this.speed);
        }
        

        public abstract draw(): void 

        public update(): void {
            this.draw();
            this.move();
        }
    }
}
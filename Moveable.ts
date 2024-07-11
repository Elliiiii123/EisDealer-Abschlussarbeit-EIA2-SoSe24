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
            if (newPosition.x < 0 || newPosition.x > canvasWidth) {
                this.speed.x *= -1;
            }
            if (newPosition.y < 0 || newPosition.y > canvasHeight) {
                this.speed.y *= -1;
            }

            this.position = this.position.add(this.speed);
        }
        

        protected abstract draw(): void 

        public update(): void {
            this.draw();
            this.move();
        }
    }
}
namespace EisDealer {
    export abstract class Moveable extends Drawable{
        protected direction: Vector;
        protected speed: Vector;

        constructor (_position: Vector,_speed: Vector, _direction: Vector){
            //console.log("Duck Constructor")
            super(_position);
            this.direction = _direction;
            this.speed = _speed;
        }
    
        protected abstract move():void 

        protected abstract draw(): void 

        public update(): void {
            this.draw();
            this.move();
        }
    }
}
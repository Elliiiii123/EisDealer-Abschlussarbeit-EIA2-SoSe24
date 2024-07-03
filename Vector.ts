namespace EisDealer {

    export class Vector {
       public x:number
       public y:number

        constructor (_x: number, _y: number) {
        this.set(_x, _y);
        }

        // scale(_factor: number): void {
        // this.x *= _factor;
        // this.y *= _factor;
        // }

        // add(_addend: Vector): void {
        //     this.x += _addend.x;
        //     this.y += _addend.y;
        // }

        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        public normalize(): Vector {
            let length = Math.sqrt(this.x * this.x + this.y * this.y);
            this.x /= length;
            this.y /= length;
            return this;
        }
    }
}
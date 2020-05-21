

const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});

class Hero {
  constructor() {
    this.myPos = [0, 0, 0];
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.angle = 0; // heading
    this.dAngle = 0;
  }
  setSpeed(dx,dy) {
    this.dx = dx;
    this.dy = dy;
  }
  update() {
    this.move();
    this.angle += this.dAngle;
    // this.draw();
  }
  move(){
    if (this.x+this.dx > 9 || this.x + this.dx < -9){
      this.dx = 0;
    }
    if (this.y+this.dy > 5.5 || this.y + this.dy < -5.5){
      this.dy = 0;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
  draw() {
    // pass
  }

}

export const myHero = new Hero();

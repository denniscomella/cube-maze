import {
  Object,
  objects
} from './objects.js'
import {
  myHero
} from './hero.js'
import {
  setCpuScore,
  getScores,
} from './scores.js';

const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});
const w = c.canvas.width / 2;
const h = c.canvas.height / 2;


class NPC extends Object {
  constructor(x, y, z = 0) {
    super(x, y, z);
    this.speed = .04;
    this.x = x;
  }
  update() {
    this.speed = .04 + .002*getScores()[0];
    if (this.x < objects.target.x-.04){
      this.x += this.speed;
    } else if (this.x > objects.target.x+.04){
      this.x -= this.speed;
    }
    else if (this.y < objects.target.y-.04){
      this.y += this.speed;
    } else if (this.y > objects.target.y+.04){
      this.y -= this.speed;
    } else {
      objects.target.onHit();
      setCpuScore(getScores()[1]+1);
    }
    // this.x = Math.round(this.x*1000)/1000;
    // this.y = Math.round(this.y*1000)/1000;

    this.draw();
  }
  draw() {
    c.beginPath();
    this.xDist = this.x - myHero.x;
    this.yDist = this.y - myHero.y;
    // let centerDist = this.getDist(this.xDist, this.yDist);
    // let centerHDisp = this.getXDisp(this.xDist, this.yDist);
    // let xRad = 2 * w * h * Math.abs(centerHDisp - this.getXDisp(this.xDist - .5, this.yDist)) / centerDist
    // let yRad = Math.abs(h - h / (centerDist - this.getDist(this.xDist, this.yDist + .5))) / centerDist

    //console.log(xRad, yRad);

    c.fillStyle = 'blue';
    //c.ellipse(w + 2 * h * centerHDisp / centerDist, h - h / centerDist,50,50,0,0,Math.PI*2)
    //c.ellipse(w + 2 * h * centerHDisp / centerDist, h - h / centerDist, xRad,yRad, 0, 0,2*Math.PI);


    this.getCorners();
    // back left
    c.moveTo(w + 2 * h * this.xDispBL / this.backLeft, h - h / this.backLeft);
    // front left
    c.lineTo(w + 2 * h * this.xDispFL / this.frontLeft, h - h / this.frontLeft);
    // front right
    c.lineTo(w + 2 * h * this.xDispFR / this.frontRight, h - h / this.frontRight);
    // back right
    c.lineTo(w + 2 * h * this.xDispBR / this.backRight, h - h / this.backRight);
    // back left
    c.lineTo(w + 2 * h * this.xDispBL / this.backLeft, h - h / this.backLeft);

    c.fill();
    c.stroke();


  }
}
export let npc1 = new NPC(0, 5);

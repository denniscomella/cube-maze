import {
  myHero,
} from './hero.js';
import {
  playSFX,
} from './audio.js';
import {
  setBioScore,
  setCpuScore,
  getScores,
} from './scores.js';

export let score = 0;
export let cpuScore = 0;
let npcSpeed = .5
export function setNPCSpeed(x){
  return x;
}

const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});

const w = c.canvas.width / 2;
const h = c.canvas.height / 2;

export let objects = {
  content: [],
  target: null,
}

export class Object {
  constructor(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.xDist = 0;
    this.yDist = 0;
    this.type = null;
    this.getCorners();
    this.update();
  }

  randomizePos() {
    this.x = Math.floor(Math.random() * 17) - 8;
    this.y = Math.floor(Math.random() * 11) - 5;
  }
  checkOverlap(x = objects.content.indexOf(this)) {
    for (let i = x + 1; i < objects.content.length; i++) {
      if (i !== objects.content.indexOf(this) && this.x == objects.content[i].x && this.y == objects.content[i].y) {
        this.randomizePos();
        this.checkOverlap(0);
        break;
      } else if (this.x == Math.round(myHero.x) && this.y == Math.round(myHero.y)) {
        this.randomizePos();
        this.checkOverlap(0);
        break;
      }

    }
  }




  calculateDistance(heroX, heroY) {
    this.xDist = this.x - heroX;
    this.yDist = this.y - heroY;
  }
  getDist(xDist, yDist) {
    return Math.sqrt(xDist * xDist + yDist * yDist);
  }
  getXDisp(xDist, yDist) {
    let angle = Math.atan(xDist / yDist);
    angle = angle - myHero.angle * Math.PI / 180;
    const hypot = this.getDist(xDist, yDist);
    return Math.sin(angle) * hypot * (yDist < 0 ? -1 : 1);
  }

  checkIfInFront() {
    const x = this.x - myHero.x;
    const y = this.y - myHero.y;
    let d = this.getDist(x, y);
    let cos = Math.cos(myHero.angle * Math.PI / 180 - Math.atan(x / y)) * d
    return cos >= 0 && y >= 0 || cos < 0 && y < 0
  }

  collisionCheck(r = .6) {
    let newX = myHero.x + myHero.dx
    let newY = myHero.y + myHero.dy

    if (newX <= this.x + r && newX >= this.x - r &&
      newY <= this.y + r && newY >= this.y - r) {
      return false;
    }
    return true;
  }

  getCorners() {
    this.frontLeft = this.getDist(this.xDist - .5, this.yDist - .5);
    this.frontRight = this.getDist(this.xDist + .5, this.yDist - .5);
    this.backLeft = this.getDist(this.xDist - .5, this.yDist + .5);
    this.backRight = this.getDist(this.xDist + .5, this.yDist + .5);

    // define x position on screen based on self angle
    this.xDispFL = this.getXDisp(this.xDist - .5, this.yDist - .5);
    this.xDispFR = this.getXDisp(this.xDist + .5, this.yDist - .5);
    this.xDispBL = this.getXDisp(this.xDist - .5, this.yDist + .5);
    this.xDispBR = this.getXDisp(this.xDist + .5, this.yDist + .5);
  }
}

export class Block extends Object {
  constructor(x, y, z = 0) {
    super(x, y, z);
  }
  update() {
    this.calculateDistance(myHero.x, myHero.y)
    if (!this.collisionCheck()) {
      myHero.dx = 0;
      myHero.dy = 0;
    };
    this.getCorners();
    if (this.checkIfInFront()) {
      this.draw();
    }
  }

  drawBack() {
    // back square
    c.beginPath();
    // top left, counterclockwise
    c.moveTo(w + 2 * h * this.xDispBL / this.backLeft, h - h / this.backLeft);
    c.lineTo(w + 2 * h * this.xDispBL / this.backLeft, h + h / this.backLeft);

    c.lineTo(w + 2 * h * this.xDispBR / this.backRight, h + h / this.backRight);
    c.lineTo(w + 2 * h * this.xDispBR / this.backRight, h - h / this.backRight);

    c.lineTo(w + 2 * h * this.xDispBL / this.backLeft, h - h / this.backLeft);

    c.stroke();
    c.closePath();
    c.fill();
  }

  drawFront() {
    // front square
    c.beginPath();
    // top left, counterclockwise
    c.moveTo(w + 2 * h * this.xDispFL / this.frontLeft, h - h / this.frontLeft);
    c.lineTo(w + 2 * h * this.xDispFL / this.frontLeft, h + h / this.frontLeft);

    c.lineTo(w + 2 * h * this.xDispFR / this.frontRight, h + h / this.frontRight);
    c.lineTo(w + 2 * h * this.xDispFR / this.frontRight, h - h / this.frontRight);

    c.lineTo(w + 2 * h * this.xDispFL / this.frontLeft, h - h / this.frontLeft);

    c.stroke();
    c.fill();
    c.closePath();
  }

  drawLeft() {
    // draw left side of box
    c.beginPath();
    // front top
    c.moveTo(w + 2 * h * this.xDispFL / this.frontLeft, h - h / this.frontLeft);
    // back top
    c.lineTo(w + 2 * h * this.xDispBL / this.backLeft, h - h / this.backLeft);
    // back bottom
    c.lineTo(w + 2 * h * this.xDispBL / this.backLeft, h + h / this.backLeft);
    // front bottom
    c.lineTo(w + 2 * h * this.xDispFL / this.frontLeft, h + h / this.frontLeft);
    // front top
    c.moveTo(w + 2 * h * this.xDispFL / this.frontLeft, h - h / this.frontLeft);
    c.closePath();
    c.stroke();
    c.fill();
  }

  drawRight() {
    // draw right side of box
    c.beginPath();
    // front top
    c.moveTo(w + 2 * h * this.xDispFR / this.frontRight, h - h / this.frontRight);
    // back top
    c.lineTo(w + 2 * h * this.xDispBR / this.backRight, h - h / this.backRight);
    // back bottom
    c.lineTo(w + 2 * h * this.xDispBR / this.backRight, h + h / this.backRight);
    // front bottom
    c.lineTo(w + 2 * h * this.xDispFR / this.frontRight, h + h / this.frontRight);
    c.stroke();
    c.closePath();
    c.fill();
  }

  draw() {
    var grd = c.createLinearGradient(0, h / 4, 0, h * .75);
    grd.addColorStop(0, 'rgba(255,255,255,.5)');
    grd.addColorStop(1, 'rgba(222,222,222,.5)');
    c.fillStyle = grd;

    if (this.xDist < 0 && this.yDist > 0) {
      this.drawBack();
      this.drawLeft();
      this.drawRight();
      this.drawFront();
    } else if (this.xDist > 0 && this.yDist > 0) {
      this.drawBack();
      this.drawRight();
      this.drawLeft();
      this.drawFront();
    } else if (this.xDist < 0 && this.yDist < 0) {
      this.drawFront();
      this.drawLeft();
      this.drawRight();
      this.drawBack();
    } else {
      this.drawFront();
      this.drawRight();
      this.drawLeft();
      this.drawBack();
    }
  }

}

export class Target extends Object {
  constructor(x, y, z = 0) {
    super(x, y, z);
    this.type = 'red';
  }

  draw() {
    c.beginPath();

    c.fillStyle = "rgba(255,0,0,.5)";
    c.strokeStyle = "green";
    c.beginPath();
    // far left, counterclockwise
    c.moveTo(w + 2 * h * this.xDispBL / this.backLeft, h + h / this.backLeft);
    c.lineTo(w + 2 * h * this.xDispFL / this.frontLeft, h + h / this.frontLeft);
    c.lineTo(w + 2 * h * this.xDispFR / this.frontRight, h + h / this.frontRight);
    c.lineTo(w + 2 * h * this.xDispBR / this.backRight, h + h / this.backRight);
    c.lineTo(w + 2 * h * this.xDispBL / this.backLeft, h + h / this.backLeft);
    c.stroke();
    c.closePath();
    c.fill();
  }
  onHit(player = 1) {
    this.randomizePos();
    this.checkOverlap(0);
    playSFX();
  }
  update() {
    this.calculateDistance(myHero.x, myHero.y)
    this.getCorners();

    if (!this.collisionCheck(.4)) {
      this.onHit();
      setBioScore(getScores()[0]+1);
    }
    if (this.checkIfInFront()) {
      this.draw();
    }
  }
}

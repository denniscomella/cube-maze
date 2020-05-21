import {
  myHero,
} from './hero.js';
import {
  blocks
} from './map.js';

const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});


const mMapSize = .33;
const blockSize = c.canvas.width * mMapSize / 20;

const mMapPos = [ // upper left of map
  (1 - mMapSize) * c.canvas.width,
  (1 - mMapSize) * c.canvas.height
];
const mapWidth = mMapSize * c.canvas.width - 10;
const mapHeight = mMapSize * c.canvas.height - 10;
const mapCenter = [mMapPos[0] + mapWidth / 2, mMapPos[1] + mapHeight / 2]

export function drawMMap() {
	// map outline & area
	c.fillStyle = "rgba(222,222,222,.75";
  c.fillRect(mMapPos[0], mMapPos[1], mapWidth, mapHeight);
  c.strokeStyle = 'blue';
  c.strokeRect(mMapPos[0], mMapPos[1], mapWidth, mapHeight);

  c.strokeStyle = 'red'; // character position
  c.beginPath();
  c.moveTo(mapCenter[0] - 5 + blockSize * myHero.x, mapCenter[1] - blockSize * myHero.y);
  c.lineTo(mapCenter[0] + 5 + blockSize * myHero.x, mapCenter[1] - blockSize * myHero.y);
  c.stroke();
  c.beginPath();
  c.moveTo(mapCenter[0] + blockSize * myHero.x, mapCenter[1] - 5 - blockSize * myHero.y);
  c.lineTo(mapCenter[0] + blockSize * myHero.x, mapCenter[1] + 5 - blockSize * myHero.y);
  c.stroke();

  c.strokeStyle = 'green'; // center of map crosshairs
  c.beginPath();
  c.moveTo(mapCenter[0] - 5, mapCenter[1]);
  c.lineTo(mapCenter[0] + 5, mapCenter[1]);
  c.stroke();
  c.beginPath();
  c.moveTo(mapCenter[0], mapCenter[1] - 5);
  c.lineTo(mapCenter[0], mapCenter[1] + 5);
  c.stroke();

  for (const block of blocks) { // draw obstacles
    c.beginPath();
    c.rect(mapCenter[0] + block.x * blockSize - (blockSize / 2),
      mapCenter[1] - block.y * blockSize - (blockSize / 2),
      blockSize,
      blockSize);
    c.stroke();
    if (block.type == 'red'){
      c.fillStyle = 'red';
      c.fill();
    }
  }
}


import { Block, Target, objects } from './objects.js'
const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});

// defines the set of blocks that will be rendered on the map


export let blocks = [];

for (var i = 0; i<10; i++){
  objects.content.push(new Block(Math.floor(Math.random() * 17) - 8,Math.floor(Math.random() * 11) - 5));
}
let target = new Target(1,1)
objects.target = target;
objects.content.push(target);
// objects.content = blocks;

for (let block of objects.content){
  block.checkOverlap();
}
blocks = objects.content;

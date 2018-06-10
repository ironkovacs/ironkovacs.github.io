'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
let size:number = canvas.width;
console.log(size);

function cross(){
  ctx.beginPath();
  ctx.moveTo(size/3, 0);
  ctx.lineTo(size/3, size);
  ctx.stroke();

}
cross();




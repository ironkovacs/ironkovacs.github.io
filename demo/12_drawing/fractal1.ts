'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
let size: number = canvas.width;
ctx.fillRect(0, 0, size, size);
ctx.fillStyle: '#f3f3f3';
console.log(size);
function colorStroke() {
  ctx.strokeStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);;
  ctx.stroke();
}

function cross(x, y, size, r) {
  let ratio = size / r
  if (size <= 2) {
  } else {
    ctx.beginPath();
    ctx.moveTo(x + ratio, 0 + y);
    ctx.lineTo(x + ratio, size + y);
    ctx.moveTo(x + size - ratio, 0 + y);
    ctx.lineTo(x + size - ratio, size + y);
    ctx.moveTo(x + 0, ratio + y);
    ctx.lineTo(x + size, ratio + y);
    ctx.moveTo(x + 0, size - ratio + y);
    ctx.lineTo(x + size, size - ratio + y);
    colorStroke();

    cross(x + ratio, 0 + y, ratio, r);
    cross(x + size - ratio, ratio + y, ratio, r);
    cross(x + 0, ratio + y, ratio, r);
    cross(x + ratio, size - ratio + y, ratio, r);
    cross(x + ratio, ratio + y, ratio, r);
  }
}
cross(0, 0, size, 3);




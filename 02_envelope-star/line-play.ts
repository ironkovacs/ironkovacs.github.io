'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// DO NOT TOUCH THE CODE ABOVE THIS LINE
let amountOfLines: number = parseInt(prompt('Vonalak száma \n a szép eredményhez válassz 12-50 közti számot!'));

let cHeight: number = canvas.height / 2
let cWidth: number = canvas.width / 2

function arcLines(x1, y1, x2, y2, ) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = 'green'//'#' + (Math.random() * 0xFFFFFF << 0).toString(16);;
  ctx.stroke();
}
function arcPairs(shiftX, shiftY) {
  let h: number = canvas.height / 2;
  let w: number = canvas.width / 2;
  for (let i = 0; i < amountOfLines; i++) {
    let x = i * w / (amountOfLines - 1);
    let y = i * h / (amountOfLines - 1);
    arcLines(shiftX, y, x + shiftX, h);
    arcLines(x, shiftY, w, y + shiftY);
    arcLines(shiftX, (y * -1) + 2 * shiftY, x + shiftX, h * -1 + 2 * shiftY);
    arcLines(x, shiftY, w, y * -1 + shiftY);

  }

}

arcPairs(cHeight, cWidth);






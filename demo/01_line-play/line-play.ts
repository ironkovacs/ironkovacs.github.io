'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// DO NOT TOUCH THE CODE ABOVE THIS LINE
let fromHtmlAmount: number = 0;

function randomRect(fromHtmlAmount){
  fromHtmlAmount = parseInt(prompt('Amount of rectangles'))
}
let amountOfLines: number = parseInt(prompt('Vonalak száma: \n a szép eredményhez válassz 12-50 közti számot! \n adj meg egy egész számot 2-1000 között\n nagyobbat is megadhatsz, de nincs sok értelme.))';
let amountOfTiles: number = parseInt(prompt('Felosztás száma \n (Pl. 3 esetén a vászon 3x3-as tagolású lesz)\n \n adj meg egy egész számot 1-10 között!\n nagyobbat is megadhatsz, de nincs sok értelme))';

function quadrants(n: number) {
  let cHeight: number = canvas.height / n;
  let cWidth: number = canvas.width / n;
  return [cHeight, cWidth];
}

function arcLines(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);;
  ctx.stroke();
}
function arcPairs(shiftX, shiftY) {
  let h: number = quadrants(amountOfTiles)[0];
  let w: number = quadrants(amountOfTiles)[1];
  for (let i = 0; i < amountOfLines; i++) {
    let x = i * w / (amountOfLines - 1);
    let y = i * h / (amountOfLines - 1);
    arcLines(0 + shiftX, y + shiftY, x + shiftX, h + shiftY);
    arcLines(x + shiftX, 0 + shiftY, w + shiftX, y + shiftY);
  }
}
for (let i = 0; i < amountOfTiles; i++) {
  for (let j = 0; j < amountOfTiles; j++) {
    arcPairs(i * quadrants(amountOfTiles)[1], j * quadrants(amountOfTiles)[0]);
  }
}





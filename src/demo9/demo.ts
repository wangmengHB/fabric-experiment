import React from 'react';
import { List,AutoSizer,CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import ReactDOM from 'react-dom';
const {loremIpsum} = require("lorem-ipsum");


import GLImage from 'gl-image';

const glImage = new GLImage();
const SIZE = 20;
const SCALE = 1;

const div = document.createElement('div');
div.style.position = 'relative';
div.style.overflow = 'hidden';
const canvas = document.createElement('canvas');
div.appendChild(canvas);
const pen = document.createElement('div');
pen.style.position = 'absolute';
pen.style.borderRadius = '50%';
pen.style.border = '1px solid black';
pen.style.backgroundRepeat = 'no-repeat';
pen.style.width = `${SIZE}px`;
pen.style.height = `${SIZE}px`;
div.appendChild(pen);

document.body.appendChild(div);

const PIC_URL_2 = './test-images/boy1.png';
const img: HTMLImageElement = new Image();
img.src = PIC_URL_2;
img.onload = async () => {
  canvas.width = img.width;
  canvas.height = img.height;
  pen.style.backgroundSize = `${SCALE * img.width}px ${SCALE * img.height}px`;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  await glImage.loadFromElement(img as any);
  
  glImage.applyFilters({
    pixelate_block_size: 6,
  });


  

  const resultCanvas = glImage.getCanvas();

  var pattern = ctx.createPattern(resultCanvas as any, 'no-repeat');
  ctx.fillStyle = pattern;
  let base64 = resultCanvas.toDataURL();
  pen.style.backgroundImage = `url(${base64})`;
  // 光标设置到不可见的位置
  pen.style.left = `-${SIZE}px`;
  pen.style.top = `-${SIZE}px`;

  let isDrawing = false;

  div.addEventListener('mousedown', (e) => {
    isDrawing = true;
  });
  div.addEventListener('mouseup', (e) => {
    isDrawing = false;
  });
  div.addEventListener('mousemove', (e) => {
    const { left, top } = canvas.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;

    // 计算光标的位置，以及 background image 的偏移量
    pen.style.left = `${x - SIZE/2}px`;
    pen.style.top = `${y - SIZE/2}px`;
    pen.style.backgroundPositionX = `-${x * SCALE - SIZE/2 }px`;
    pen.style.backgroundPositionY = `-${y * SCALE - SIZE/2 }px`;

    if (isDrawing) {
      ctx.beginPath();
      ctx.arc(x, y, SIZE/2, 0, Math.PI * 2, false);
      ctx.fill();
    }   
  }) 
}


























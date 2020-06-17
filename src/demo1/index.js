import {fabric} from 'fabric';
import './command/test';
import GLImage from 'gl-image';
const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');

window.fabric = fabric;



const canvasEle = document.createElement('canvas');
canvasEle.width = 600;
canvasEle.height = 500;
document.body.appendChild(canvasEle);

const UpperCanvasDiv = document.createElement('div');
UpperCanvasDiv.className = 'watch';
UpperCanvasDiv.innerText = 'upper canvas';
const upperImage = new Image;

UpperCanvasDiv.appendChild(upperImage);


const LowerCanvasDiv = document.createElement('div');
LowerCanvasDiv.className = 'watch';
LowerCanvasDiv.innerText = 'lower canvas';
const lowerImage = new Image;
LowerCanvasDiv.appendChild(lowerImage);

const cacheCanvasDiv = document.createElement('div');
cacheCanvasDiv.className = 'watch';
cacheCanvasDiv.innerText = 'cache canvas';
const cacheImage = new Image;
cacheCanvasDiv.appendChild(cacheImage);

window.cacheImg = cacheImage;


document.body.appendChild(UpperCanvasDiv);
document.body.appendChild(LowerCanvasDiv);
document.body.appendChild(cacheCanvasDiv);


function drawMonitor(timestamp) {
  const upper = document.querySelector('.upper-canvas');
  if (upper) {
    upperImage.src = upper.toDataURL();
  }
  const lower = document.querySelector('.lower-canvas');
  if (lower) {
    lowerImage.src = lower.toDataURL();
  }
  if (canvas && canvas.cacheCanvasEl) {
    cacheImage.src = canvas.cacheCanvasEl.toDataURL();
  }
  requestAnimationFrame(drawMonitor);
}


requestAnimationFrame(drawMonitor);


let webglBackend = new fabric.WebglFilterBackend();
fabric.filterBackend = fabric.initFilterBackend();
fabric.filterBackend = webglBackend;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 5;

const canvas = new fabric.Canvas(canvasEle, {isDrawingMode: false, preserveObjectStacking: true});

window._canvas = canvas;

const glImage = new GLImage();
window.glImage = glImage;

canvas.on('object:selected', function() {
  
  console.log('object:selected', this.getActiveObject());
})


window.isDrawing = false;



var video1El = document.getElementById('video1');

var rect = new fabric.Rect({
  left: -100,
  top: -100,
  width: 300,
  height: 280,
})

var video1 = new fabric.Image(video1El, {
  left: 0,
  top: 0,
  objectCaching: false,
  clipPath: rect,
  // objectCaching: true,
  statefullCache: true,
  cacheProperties: ['videoTime'],
});




canvas.add(video1);

canvas.renderAll();

setTimeout(() => {
  video1El.play();
  // video1El.muted = false;
  // var tmpCanvas = document.createElement('canvas');
  // tmpCanvas.width = video1El.videoWidth;
  // tmpCanvas.height = video1El.videoHeight;;
  // var ctx = tmpCanvas.getContext('2d');

  // ctx.drawImage(video1El, 0, 0);


  // // ctx.fillStyle = 'green';
  // // ctx.fillRect(10, 10, 180, 180);

  // window.ctx = ctx;
  // window.tmp = tmpCanvas;



  // var testCanvas = new fabric.Image(tmpCanvas, {
  //   left: 0,
  //   top: 0,
  //   angle: 0,
  //   objectCaching: false,
  //   // clipPath: rect
  // });


  // canvas.add(testCanvas);



}, 1000)









fabric.util.requestAnimFrame(function render() {
  canvas.renderAll();
  fabric.util.requestAnimFrame(render);

  video1.videoTime = video1El.currentTime;

  if (window.ctx) {
    window.ctx.drawImage(video1El, 0, 0);
  }


});













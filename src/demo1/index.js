import {fabric} from 'fabric';
import './command/test';
import GLImage from 'gl-image';
const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');


const style = document.createElement('style');
style.innerHTML = `
  html body { padding: 0; margin: 0;} 
  .canvas-container{float: left}
  .watch{
    float: right;
    width: 300px;
    margin-right: 20px;
  }
  .watch img{ width: 100%;}
`;
document.head.appendChild(style);

const canvasEle = document.createElement('canvas');
canvasEle.width = 500;
canvasEle.height = 400;
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


document.body.appendChild(UpperCanvasDiv);
document.body.appendChild(LowerCanvasDiv);


setInterval(() => {
  const upper = document.querySelector('.upper-canvas');
  if (upper) {
    upperImage.src = upper.toDataURL();
  }
  const lower = document.querySelector('.lower-canvas');
  if (lower) {
    lowerImage.src = lower.toDataURL();
  }

}, 1000)











let webglBackend = new fabric.WebglFilterBackend();
fabric.filterBackend = fabric.initFilterBackend();
fabric.filterBackend = webglBackend;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 5;

const canvas = new fabric.Canvas(canvasEle, {isDrawingMode: false, preserveObjectStacking: true});

window._canvas = canvas;

const glImage = new GLImage();
window.glImage = glImage;


fabric.Image.fromURL(IMG_SRC_1, function(img) {
  const oImg1 = img.set({left: 0, top: 0 });
  oImg1.filters = [];
  canvas.add(oImg1);

  var clipPath = new fabric.Circle({
    radius: 40,
    top: -40,
    left: -40
  });
  var rect = new fabric.Rect({
    width: 200,
    height: 100,
    fill: 'red',
  });
  rect.clipPath = clipPath;
  canvas.add(rect);


  canvas.renderAll();

  

  
  

  glImage.loadImageSrc(canvas.toDataURL()).then(() => {
    glImage.applyFilter('pixelate_block_size', 10)

    
    let img2 = new Image();
    img2.src = glImage.toDataUrl();

    let texturePatternBrush = new fabric.PatternBrush(canvas);
    texturePatternBrush.source = img2;

    // canvas.freeDrawingBrush = texturePatternBrush;
    // canvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
    canvas.freeDrawingBrush.width = 30;


  })




  

});

window.isDrawing = false;

// canvas.on('mouse:down', function(e){
//   const { target } = e;
//   let p1 = canvas.getPointer(e.e);
//   const name = target && target.get('name');

  
  
//   if (name === 'picture1') {
//     window.isDrawing = true;     
    
//     const cover = target.item(1);

//     const point = {
//       x: cover.left + p1.x - target.left,
//       y: cover.top + p1.y - target.top
//     };

//     let clipPath;

//     if (cover.clipPath) {
//       clipPath = cover.clipPath;
//     } else {
//       clipPath = new fabric.Group([]);
//       const circle = new fabric.Circle({
//         radius: RADIUS,
//         left: point.x - RADIUS,
//         top: point.y - RADIUS,
//       })
//       clipPath.addWithUpdate(circle);
      
//     }

//     window._path = clipPath;
   
    
//     cover.set({
//       visible: true,
//       clipPath: clipPath
//     });
//     canvas.renderAll();
//   }
// });

// canvas.on('mouse:move', function(e){
//   const { target } = e;
//   let p1 = canvas.getPointer(e.e);
//   const name = target && target.get('name');
//   if (!isDrawing) {
//     return;
//   }

//   if (name === 'picture1') {     
    
//     const cover = target.item(1);

//     const point = {
//       x: cover.left + p1.x - target.left,
//       y: cover.top + p1.y - target.top
//     };

//     let clipPath = cover.clipPath;

//     if (!clipPath) {
//       return;
//     }

//     let group = fabric.util.object.clone(clipPath);

//     const circle = new fabric.Circle({
//       radius: RADIUS,
//       left: point.x - RADIUS,
//       top: point.y - RADIUS,
//     })
//     group.addWithUpdate(circle);
//     cover.set({
//       visible: true,
//       clipPath: group
//     });
//     canvas.renderAll();
//   }
// });


// canvas.on('mouse:up', function(e){
//   const { target } = e;
//   let p1 = canvas.getPointer(e.e);
//   const name = target.get('name');
//   window.isDrawing = false;
//   return;
// });



document.addEventListener('keydown', e => {
  
  if (e.keyCode === 90 && e.ctrlKey) {
    // undo
    if (oImg2.clipPath && oImg2.clipPath.type === 'group') {
      let group = fabric.util.object.clone(oImg2.clipPath);
      const items = group.getObjects();
      console.log(items.length)
      if (Array.isArray(items) && items.length > 1) {
        group.removeWithUpdate(items[items.length - 1]);
      } else {
        group = new fabric.Group([]);
      }  
      oImg2.set({
        clipPath: group
      })
      canvas.renderAll();

    }
    
  }

})




  

  function test() {

    try {
      console.log('try');
      
      return console.log('return') || 'rest';
      throw new Error();
    } catch (e) {
      console.log('catch');
    } finally {
      console.log('finally.')
    }

    console.log('last part');
  
  }
  let a = test();
  console.log('a', a);
  console.log('run test');









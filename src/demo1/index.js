import {fabric} from 'fabric';
import './command/test';
import GLImage from 'gl-image';
const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');

window.fabric = fabric;


const style = document.createElement('style');
style.innerHTML = `
  html body { padding: 0; margin: 0;} 
  .canvas-container{float: left}
  .watch{
    float: right;
    width: 200px;
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


fabric.Image.fromURL(IMG_SRC_1, function(img) {
  const oImg1 = img.set({left: 0, top: 0 });
  oImg1.perPixelTargetFind = true;
    
  var rect = new fabric.Rect({
    left: 300,
    top: 200,
    width: 200,
    height: 100,
    fill: 'red',
  });

  window.circle1 = new fabric.Circle({
    left: 200,
    top: 300,
    width: 200,
    height:200,
    radius: 100,
    fill: 'green',
  });
  
  canvas.add(rect);
  canvas.add(oImg1);
  canvas.add(window.circle1);


  var text = new fabric.Text("  Text with a stroke  ",{
    left: 100,
    top: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    stroke: '#ff1318',
    strokeWidth: 1,
    // fontStyle: 'italic',
    fontFamily: 'Delicious',
    // opacity: 0.3,
    skewX: -20,
    skewY: 0
  });

  canvas.add(text);



  canvas.renderAll();

  window.text = text;


  var LabeledRect = fabric.util.createClass(fabric.Rect, {
    type: 'labeledRect',
    initialize: function(options) {
      options || (options = { });
      this.callSuper('initialize', options);
      this.set('label', options.label || '');
      this.set('labelFont', options.labelFont || '');
      this.set('labelFill', options.labelFill || '');
    },
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        label: this.get('label'),
        labelFont: this.get('labelFont'),
        labelFill: this.get('labelFill')
      });
    },
    _render: function(ctx) {
      this.callSuper('_render', ctx);
      // ctx.font = '20px Helvetica';
      // ctx.fillStyle = '#333';
      console.log('this', this);
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelFill;
      // ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
      ctx.fillText(this.label, 0, 0);
    }
  });

  var labeledRect = new LabeledRect({
    width: 100,
    height: 50,
    left: 100,
    top: 100,
    label: 'test',
    fill: '#faa',
    labelFont: '30px Helvetica',
    labelFill: '#00ff00'
  });


  canvas.add(labeledRect);

  canvas.renderAll();

  setTimeout(function(){
    labeledRect.set({
      label: 'trololo',
      fill: '#aaf',
      rx: 10,
      ry: 10,
          labelFill: '#0000ff'
    });
    canvas.renderAll();
  }, 3000)

  

  
  

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









import {fabric} from 'fabric';
import './command/test';
const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');


const style = document.createElement('style');
style.innerHTML = 'html body { padding: 0; margin: 0;}';
document.head.appendChild(style);

const canvasEle = document.createElement('canvas');
canvasEle.width = window.screen.availWidth - 300;
canvasEle.height = window.screen.availHeight;
document.body.appendChild(canvasEle);




let webglBackend = new fabric.WebglFilterBackend();
fabric.filterBackend = fabric.initFilterBackend();
fabric.filterBackend = webglBackend;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 5;

const canvas = new fabric.Canvas(canvasEle);






window._canvas = canvas;


const radius = 50;

fabric.Image.fromURL(IMG_SRC_1, function(img) {
  const oImg1 = img.set({left: 0, top: 0 });
  const oImg2 = fabric.util.object.clone(img);
  oImg2.set({left: 0, top: 0});
  oImg2.filters.push(
    new fabric.Image.filters.BlackWhite()
  );
  oImg2.applyFilters();
  oImg1.filters = [];

  window.oImg2 = oImg2;
  const group = new fabric.Group([oImg1, oImg2], {
    left: 0,
    top: 0,
  });
  window.group = group;




  oImg2.set({
    visible: false,
  });

  group.selectable = false

  



  canvas.add(group);
  canvas.renderAll();

  let isDrawing = false;

  canvas.on('mouse:up', function(e){
    const { target } = e;
    let p1 = canvas.getPointer(e.e);   
    if (target && target.type === 'group') {      
      const cover = target.item(1);

      let clipPath;

      if (cover.clipPath) {
        clipPath = cover.clipPath;
      } else {
        clipPath = new fabric.Path(`M ${oImg2.left + p1.x - group.left} ${oImg2.top + p1.y - group.top}`);
        clipPath.set({
          left: 0,
          top: 0,
          stroke: 'green',
          opacity: 1,
          strokeWidth: 10,
        });
      }
      
      window._path = clipPath;
      
      cover.set({
        visible: true,
        clipPath: clipPath
      });
      canvas.renderAll();
    }
  })
});


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









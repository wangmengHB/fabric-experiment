const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');
import GLImage  from './gl-image';


const style = document.createElement('style');
style.innerHTML = 'html body { padding: 0; margin: 0;}';
document.head.appendChild(style);


const canvasEle = document.createElement('canvas');
document.body.appendChild(canvasEle);


let glImage = new GLImage(canvasEle);
let canvas = glImage.getCanvas();
document.body.appendChild(canvas);

window.glImage = glImage;


glImage.loadImageSrc(IMG_SRC_1).then(() => {
  glImage.draw();
})




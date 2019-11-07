const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');
import GLImage from 'gl-image';

let resEle = document.createElement('div');
resEle.style.position = 'fixed';
resEle.style.top = '0';
resEle.style.right = '0';
resEle.style.width = '300px';
document.body.appendChild(resEle);




let glImage = new GLImage();

// glImage.loadImageSrc(IMG_SRC_1).then(() => {
  
// })

const imageSrcList = [IMG_SRC_1, IMG_SRC_2, IMG_SRC_3];

async function processSingle(imageSrc) {
  await glImage.loadImageSrc(imageSrc);
  glImage.applyFilters({
    'brightness': -0.2,
    'saturation': -0.7
  });
  return glImage.toDataUrl();
}

async function batchProcess(imageSrcList) {
  const result = [];
  for (let i = 0; i < imageSrcList.length; i++) {
    const res = await processSingle(imageSrcList[i]);
    result.push(res);
  }
  return result;
}

batchProcess(imageSrcList).then((result) => {
  console.log(result);
  result.forEach((base64) => {
    const img = new Image();
    img.src = base64;
    img.style.width = '100%';

    resEle.appendChild(img);
  })
})



let canvas = glImage.getCanvas();
document.body.appendChild(canvas);


window.glImage = glImage;
window.SRC_2 = IMG_SRC_2;
window.SRC_3 = IMG_SRC_3;

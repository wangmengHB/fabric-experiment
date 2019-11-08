import GLImage from 'gl-image';

const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');


const SRC_1 = './test-images/1.jpg';
const SRC_2 = './test-images/2.jpg';
const SRC_3 = './test-images/3.jpg';
const SRC_4 = '/test-images/4.jpg';
// const SRC_5 = '/test-images/5.jpg';
// const SRC_6 = '/test-images/6.jpg';
// const SRC_7 = '/test-images/7.jpg';
// const SRC_8 = '/test-images/8.jpg';
// const SRC_9 = '/test-images/9.jpg';
// const SRC_10 = '/test-images/10.jpg';
// const SRC_11 = '/test-images/11.jpg';
// const SRC_12 = '/test-images/12.jpg';


const imageSrcList = [
  SRC_1, 
  SRC_2, 
  SRC_3,
  SRC_4,
  // IMG_SRC_1,
  // IMG_SRC_2,
  // IMG_SRC_3,
  // SRC_5,
  // SRC_6,
  // SRC_7,
  // SRC_8,
  // SRC_9,
  // SRC_10,
  // SRC_11,
  // SRC_12,
];

const style = document.createElement('style');
style.innerHTML = `
html body { padding: 0; margin: 0;}
.origin{
  position: absolute;
  right: 400px;
  top: 0;
  width: 300px;
  
}

.origin img{
  width: 100%;
}

.result {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}

.result img{
  width: 100%;
}

`;
document.head.appendChild(style);




let origin = document.createElement('div');
origin.className = 'origin';
document.body.appendChild(origin);
imageSrcList.forEach(src => {
  const img = new Image();
  img.src = src;
  origin.appendChild(img);
})



let resEle = document.createElement('div');
resEle.className = 'result';
document.body.appendChild(resEle);



let glImage = new GLImage();

async function processSingle(imageSrc) {
  await glImage.loadImageSrc(imageSrc);
  console.time('draw');
  glImage.applyFilters({
    'brightness': -0.3,
    'saturation': -0.6,
    'constrast': -0.9,
    'hue': 0.3,
    'vibrance_amount': -0.3,
  });
  console.timeEnd('draw');

  const p = new Promise((resolve, reject) => {
    glImage.getCanvas().toBlob(function (blob) {
      const img = document.createElement("img");
      const url = URL.createObjectURL(blob);
      img.src = url;
      img.onload = function () {
        // no longer need to read the blob so it's revoked
        URL.revokeObjectURL(url);  
      };  
      resEle.appendChild(img);
      resolve('done');
    });
  });

  await Promise.resolve(p);
  return 'success';
}

async function batchProcess(imageSrcList) {
  const result = [];
  console.time('performance');
  for (let i = 0; i < imageSrcList.length; i++) {
    const res = await processSingle(imageSrcList[i]);
    result.push(res);
  }
  console.timeEnd('performance');
  return result;
}

batchProcess(imageSrcList).then((result) => {
  console.log(result);
  result.forEach((base64) => {
    // const img = new Image();
    // img.src = base64;
    // img.style.width = '100%';

    // resEle.appendChild(img);
  })
})



// let canvas = glImage.getCanvas();
// document.body.appendChild(canvas);


window.glImage = glImage;
window.SRC_2 = IMG_SRC_2;
window.SRC_3 = IMG_SRC_3;

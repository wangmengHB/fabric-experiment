import './command/test';
import { AudioBufferLoader } from './audio';
import GLImage from 'gl-image';

var fabric = window.fabric;

const PIC_URL = './test-images/test1.png';

const PIC_IMAGE = new Image();
PIC_IMAGE.src = PIC_URL;



const canvasEle = document.createElement('canvas');
canvasEle.width = 650;
canvasEle.height = 600;
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

var canvas2dBackend = new fabric.Canvas2dFilterBackend();
let webglBackend = new fabric.WebglFilterBackend();
fabric.filterBackend = fabric.initFilterBackend();
fabric.filterBackend = webglBackend;
// fabric.filterBackend = canvas2dBackend;
    
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 5;

const canvas = new fabric.Canvas(canvasEle, {isDrawingMode: false, preserveObjectStacking: true});
canvas.backgroundColor = '#fff'

window._canvas = canvas;

const glImage = new GLImage();
window.glImage = glImage;

canvas.on('object:selected', function() {
  
  console.log('object:selected', this.getActiveObject());
})


window.isDrawing = false;




const VIDEO_URL = '蛋糕.mp4';


var copyVideo = false;

function setupVideo(url) {
  const video = document.createElement('video');

  var playing = false;
  var timeupdate = false;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;

  // Waiting for these 2 events ensures
  // there is data in the video

  video.addEventListener('playing', function() {
     playing = true;
     checkReady();
  }, true);

  video.addEventListener('timeupdate', function() {
     timeupdate = true;
     checkReady();
  }, true);

  video.src = url;
  video.play();

  function checkReady() {
    if (playing && timeupdate) {
      copyVideo = true;
    }
  }


  

  video.style.display = 'none';
  document.body.appendChild(video);

  return video;
}


const testCanvas = document.createElement('canvas');
testCanvas.width = 650;
testCanvas.height = 200;


var video1, mockVideo, image1;
var video1El = setupVideo(VIDEO_URL);
window.video1El = video1El;
video1El.onloadedmetadata = () => {
  // video1El.play();
  video1El.width = video1El.videoWidth;
  video1El.height = video1El.videoHeight;

  setTimeout(() => {
    if (copyVideo) {

      var path = new fabric.Path('M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z');


      path.set({
        left: 490,
        top: 0,
        scaleX: 1,
        scaleY: 1,
        absolutePositioned: true,
      })
      
      video1 = new fabric.Image(video1El, {
        left: 0,
        top: -10,
        objectCaching: false,
        clipPath: path,
        // objectCaching: true,
        statefullCache: true,
        cacheProperties: ['videoTime'],
        hasControls: false,
        hasBorders: false,
      });
      
      
  
   

      mockVideo = new fabric.Image(testCanvas, {
        left: 0,
        top: 400,
        width: 650,
        height: 200,
        statefullCache: true,
        cacheProperties: ['videoTime'],
      });

      canvas.add(mockVideo);
      canvas.add(video1);
      canvas.add(new fabric.Textbox('canvas录制的视频', {
        left: 10, top: 10, 
        stroke: 'blue', fill: 'red',
        hasControls: false,
        hasBorders: false,
      }));

      image1 = new fabric.Image(PIC_IMAGE, {
        left: -10,
        top: 150,
        scaleX: 0.5,
        scaleY: 0.5,
        hasControls: false,
        hasBorders: false,
      });

      image1.filters = [
        new fabric.Image.filters.Brightness({ brightness: 0 }),
        new fabric.Image.filters.Contrast({ contrast: 0 }),
        new fabric.Image.filters.HueRotation({ rotation: 0 }),
        new fabric.Image.filters.Saturation({ saturation: 0 }),
      ];
      window.image1 = image1;
      image1.centeredScaling = true;

      canvas.add(image1);

      
      canvas.renderAll();
    }
    
    
    
    
  }, 1000);
  
  
}












function ramdomVal() {
  let val = Math.random() * 1.2 - 0.6;
  return val;

}






const audioContext = new AudioContext();
const audioLoader  = new AudioBufferLoader(audioContext);
audioLoader.loadBuffer('/只对你有感觉.mp3').then((buffer) => {

  let recorder, chunks = [];
  
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = buffer;



  // 创建一个 dest 节点, 用于保存流
  const dest = audioContext.createMediaStreamDestination();
  const aStream = dest.stream;
  
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;

  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.connect(dest);


  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  setTimeout(() => {
    sourceNode.start(0);
    
    
    rec.onclick = clickHandler;
    rec.disabled = false;
  }, 1000);




  function clickHandler() {
    this.textContent = 'stop recording';

    const target = canvas.getElement();
    const cStream = target.captureStream();
    cStream.addTrack(aStream.getAudioTracks()[0]);
    recorder = new MediaRecorder(cStream);
    recorder.start();
    recorder.ondataavailable = saveChunks;
    recorder.onstop = exportStream;
    this.onclick = stopRecording;
  };

  function exportStream(e) {

    if (chunks.length > 0) {

      var blob = new Blob(chunks, { type: "video/mp4" })
      var vidURL = URL.createObjectURL(blob);
      var vid = document.createElement('video');
      vid.controls = true;
      vid.src = vidURL;
      vid.onend = function() {
        URL.revokeObjectURL(vidURL);
      }
      document.body.appendChild(vid);
    }
  }

  function saveChunks(e) {
    e.data.size && chunks.push(e.data);
  }

  function stopRecording() {
    sourceNode.stop();
    this.parentNode.removeChild(this);
    recorder.stop();
  }



  var ctx = testCanvas.getContext("2d");
  var WIDTH = testCanvas.width;
  var HEIGHT = testCanvas.height;


  window.ctx = ctx;

  var barWidth = (WIDTH / bufferLength) * 1.5;
  var barHeight;


  let lastAvg = 0;

  fabric.util.requestAnimFrame(function render() {
  
    
    canvas.renderAll();
  

    if (video1 && video1El && video1.videoTime !== video1El.currentTime) {
      video1.videoTime = video1El.currentTime;
      mockVideo.videoTime = video1El.currentTime;
      
      image1.filters[0].brightness = ramdomVal();
      image1.filters[1].contrast = ramdomVal();
      image1.filters[2].rotation = ramdomVal();
      image1.filters[3].saturation = ramdomVal();

      image1.applyFilters();

      analyser.getByteFrequencyData(dataArray);
  
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0, x = 0; i < bufferLength; i=i+1 ) {
          barHeight = dataArray[i];

          var r = barHeight + 25 * (i / bufferLength);
          var g = 250 * (i / bufferLength);
          var b = 50;

          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 2;
      }

    }

    let avg = 0;
    for (let i = 0; i < bufferLength; i++) {
      avg += dataArray[i];
    }
    avg = avg / bufferLength;


    if (lastAvg > 0) {
      let scale = avg - lastAvg;
      let originScaleX = image1.scaleX;
      let next = originScaleX + (scale / 1000);

      if (scale > 0) {
        next = MIN;
      } else {
        next = MAX;
      }

      image1.set(next);

  

    }


    lastAvg = avg;

    fabric.util.requestAnimFrame(render);
    


  
  });



});


const MIN = {
  scaleX: 0.5,
  scaleY: 0.5,
  left: -0,

}

const MAX = {
  scaleX: 0.8,
  scaleY: 0.8,
  left: -200,
};















import './command/test';
import GLImage from 'gl-image';

var fabric = window.fabric;


const IMG_SRC_1 = './test-images/test1.png';
const IMG_SRC_2 = './test-images/test2.png';
const IMG_SRC_3 = '../test-images/test3.jpg';





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



var video1;
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
        left: 120,
        top: 100,
        scaleX: 3,
        scaleY: 3,
        absolutePositioned: true,
      })
      
      video1 = new fabric.Image(video1El, {
        left: 0,
        top: 100,
        objectCaching: false,
        clipPath: path,
        // objectCaching: true,
        statefullCache: true,
        cacheProperties: ['videoTime'],
        hasControls: false,
        hasBorders: false,
      });
      video1.filters = [
        new fabric.Image.filters.Brightness({ brightness: 0 }),
        new fabric.Image.filters.Contrast({ contrast: 0 }),
        new fabric.Image.filters.HueRotation({ rotation: 0 }),
        new fabric.Image.filters.Saturation({ saturation: 0 }),
      ];
      video1.applyFilters();
  
      canvas.add(video1);
      canvas.add(new fabric.Textbox('这是一个canvas录制的视频', {
        left: 20, top: 20, 
        stroke: 'red', fill: 'red',
        hasControls: false,
        hasBorders: false,
      }))  
      
      canvas.renderAll();
    }
    
    
    
    
  }, 1000);
  
  
}









fabric.util.requestAnimFrame(function render() {
  
  
  setTimeout(() => {
    canvas.renderAll();
    fabric.util.requestAnimFrame(render);
  }, 10)
  
  
  

  if (video1 && video1El && video1.videoTime !== video1El.currentTime) {
    video1.videoTime = video1El.currentTime;
    

    // console.log(video1El.currentTime);
    
    video1.filters[0].brightness = ramdomVal();
    video1.filters[1].contrast = ramdomVal();
    video1.filters[2].rotation = ramdomVal();
    video1.filters[3].saturation = ramdomVal();

    video1.applyFilters();

    
    

  }
  



  if (window.ctx) {
    window.ctx.drawImage(video1El, 0, 0);
  }


});


function ramdomVal() {
  let val = Math.random() * 1 - 0.5;
  return val;

}





var cStream,
  aStream,
  vid,
  recorder,
  chunks = [];


function clickHandler() {
  this.textContent = 'stop recording';

  const target = canvas.getElement();
  cStream = target.captureStream(30);
  cStream.addTrack(aStream.getAudioTracks()[0]);
  recorder = new MediaRecorder(cStream);
  recorder.start();
  recorder.ondataavailable = saveChunks;
  recorder.onstop = exportStream;
  this.onclick = stopRecording;
};

function exportStream(e) {

  if (chunks.length > 0) {

    var blob = new Blob(chunks, { type: "video/webm" })
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

  vid.pause();
  this.parentNode.removeChild(this);
  recorder.stop();

}

function initAudioStream(evt) {

  var audioCtx = new AudioContext();
  // create a stream from our AudioContext
  var dest = audioCtx.createMediaStreamDestination();
  aStream = dest.stream;
  // connect our audio element's output to the stream
  var sourceNode = audioCtx.createMediaElementSource(this);
  sourceNode.connect(dest)
    // start the video

  setTimeout(() => {
    this.play();
    sourceNode.connect(audioCtx.destination);

    
    rec.onclick = clickHandler;
    rec.disabled = false;
  }, 1000) 
  

  
};

var loadVideo = function() {

  vid = document.createElement('audio');
  vid.crossOrigin = 'anonymous';
  vid.oncanplay = initAudioStream;
  vid.src = '/Unravel.mp3';  
}

loadVideo();









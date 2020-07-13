import './command/test';
import { AudioBufferLoader } from 'web-util-kit';
import GLImage from 'gl-image';

var fabric = window.fabric;

const PIC_URL_1 = './test-images/girl1.png';
const PIC_URL_2 = './test-images/boy1.png';


const blue = '#1890ff';
const purple = '#722ed1';
const cyan = '#13c2c2';
const green = '#52c41a';
const magenta = '#eb2f96';
const pink = '#eb2f96';
const red = '#f5222d';
const oranage = '#fa8c16';
const yellow = '#fadb14';
const volcano = '#fa541c';
const geekblue = '#2f54eb';
const lime = '#a0d911';
const gold = '#faad14';


const COLOR_LIST_1 = [
blue,
purple,
cyan,
green,
magenta,
];

const COLOR_LIST_2 = [
  pink,
  red,
  oranage,
  yellow,
  volcano,
  geekblue,
  lime,
  gold,
];


const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 600;

const NOISE_SIZE = 40;



const canvasEle = document.createElement('canvas');
canvasEle.width = CANVAS_WIDTH;
canvasEle.height = CANVAS_HEIGHT;
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







const testCanvas = document.createElement('canvas');
testCanvas.width = CANVAS_WIDTH;
testCanvas.height = 300;

const testCanvas2 = document.createElement('canvas');
testCanvas2.width = CANVAS_WIDTH;
testCanvas2.height = CANVAS_HEIGHT;

const context2 = testCanvas2.getContext('2d');




var mockVideo, image1, bgImage;


mockVideo = new fabric.Image(testCanvas, {
  left: 0,
  top: 400,
  width: CANVAS_WIDTH,
  height: 300,
  statefullCache: true,
  cacheProperties: ['videoTime'],
});

bgImage = new fabric.Image(testCanvas2, {
  left: 0,
  top: 0,
  statefullCache: true,
  cacheProperties: ['videoTime'],
});

canvas.add(bgImage);
canvas.add(mockVideo);




fabric.Image.fromURL(PIC_URL_2, oImg => {
  image1 = oImg;

  image1.set({
    left: 200,
    top: 100,
    scaleX: 1.2,
    scaleY: 1.2,
    hasControls: false,
    hasBorders: false,
  });
  
  image1.filters = [
    new fabric.Image.filters.Brightness({ brightness: 0 }),
    new fabric.Image.filters.Contrast({ contrast: 0 }),
    new fabric.Image.filters.HueRotation({ rotation: 0 }),
    new fabric.Image.filters.Saturation({ saturation: 0 }),
    new fabric.Image.filters.Blur({ blur: 0 }),
    new fabric.Image.filters.Noise({ noise: 0 }),
  ];
  image1.centeredScaling = true;
  image1.applyFilters();
  
  canvas.add(image1);

  canvas.renderAll();

  window.image1 = image1;

});










function ramdomVal(max, min) {
  let val = min + (max - min) * Math.random();
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

  var synthDelay = audioContext.createDelay(5.0);

  sourceNode.connect(synthDelay)

  synthDelay.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.connect(dest);


  const bufferLength = analyser.frequencyBinCount;
  console.log('bufferLength', bufferLength);

  const dataArray = new Uint8Array(bufferLength);


  const aBtn = document.getElementById('audio');
  aBtn.disabled = false;

  let uid = 0;
  aBtn.onclick = () => {
    if (uid % 2 === 0) {
      sourceNode.start(0);
      rec.onclick = clickHandler;
      rec.disabled = false;
    } else {
      sourceNode.stop();
    }
    uid++;
    
  }
  

  

  // bufferlength is half of fftSize -> this initializes the radius to be 5
  var nodes = d3.range(bufferLength).map(function(j) {
    return {radius: 5} }),
    root = nodes[0],
    color = d3.scale.linear()
        .domain([1, bufferLength])
        .range([d3.rgb("#007AFF"), d3.rgb("#FFF500")]);

    root.radius = 0;
    root.fixed = true;

    var force = d3.layout.force()
            .gravity(0)   // seems like 'else' in charge is the radius of your mouse -> the radiuse by which the other nodes are repelled by
            .charge(function(d, i) { return i ? 0 : -1; })   // return i ? means if i exists (aka True) return 0, else -200
            .nodes(nodes)
            .size([CANVAS_WIDTH, CANVAS_HEIGHT]);

    force.start();



    





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
    sourceNode.stop();
    this.parentNode.removeChild(this);
    recorder.stop();
  }



  var ctx = testCanvas.getContext("2d");
  var WIDTH = testCanvas.width;
  var HEIGHT = testCanvas.height;



  var barWidth = (WIDTH / bufferLength) * 10;
  var barHeight;
  let step = bufferLength * (barWidth/WIDTH) - 2;
  console.log('step', step);


  let lastAvg = 0;

  fabric.util.requestAnimFrame(function render() {
  
    
    canvas.renderAll();
    image1.videoTime = image1.videoTime + 1;

    
      analyser.getByteFrequencyData(dataArray);
  
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0, x = 0; i < bufferLength; i=i+step ) {
          barHeight = Math.floor((dataArray[i] / 255 ) * HEIGHT);

          var r = barHeight + 25 * (i / bufferLength);
          var g = 250 * (i / bufferLength);
          var b = 50;

          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 4;
      }



      

      // map radius to frequencies
      for (var j=0; j < bufferLength; j++) {
          if(dataArray[j] < 5) {
            nodes[j].radius = dataArray[j] + 7
          } else {
            nodes[j].radius = Math.pow(dataArray[j], 2) / Math.pow(255,2) * 30 + 7;
          }
      }
      var q = d3.geom.quadtree(nodes),         // constructs quadtree from nodes array -> this speeds up the operations to de carried out on each node
          // quadtree returns the root node of a new quadtree
          i = 0,
          n = nodes.length;

      while (++i < n) q.visit(collide(nodes[i]));      // visit each node and take 5 arguments: quad, x1,y1,x2,y2


      
      

      context2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      
      // keep balls bouncing

      
      nodes.forEach((circle) => {
          
          const {x, y, radius, index } = circle;
          

          
          window.circle = circle;
          


          context2.save();
          context2.beginPath();

          context2.globalAlpha =  Math.random() * 0.9;

          context2.fillStyle = freqToColor(index);
          context2.arc(x, y, radius, 0, Math.PI * 2);

          
          context2.fill();
          context2.closePath();
          context2.restore();

      })

      
      hexbin(CANVAS_WIDTH, CANVAS_HEIGHT, dataArray, context2);

      force.alpha(1);



    

    let avg = 0;
    for (let i = 0; i < bufferLength; i++) {
      avg += dataArray[i];
    }
    avg = avg / bufferLength;


    if (lastAvg > 0) {
      let diff = avg - lastAvg;
      // console.log('diff', diff);
      let next = {};


      if (Math.abs(diff) > .5) {
        if ( diff > 0) {
          next = MIN();
          
          image1.applyFilters();
        } else if ( diff < 0) {
          next = MAX();
          
          
        }
        image1.filters[0].brightness = ramdomVal(0.2, -0.3);
        // image1.filters[1].contrast = ramdomVal();
        // image1.filters[2].rotation = ramdomVal();
        // image1.filters[3].saturation = ramdomVal();
        image1.filters[4].blur = ramdomVal(0.05, 0);
        image1.filters[5].noise = ramdomVal(10, 0);
        image1.applyFilters();
      }

      

      image1.set(next);

  

    }


    lastAvg = avg;

    fabric.util.requestAnimFrame(render);
    


  
  });



});


const MIN = () => ({
  scaleX: 1.2,
  scaleY: 1.2,
  top: 100 + Math.random() * NOISE_SIZE,
  left: 200 + Math.random() * NOISE_SIZE,
});

const MAX = () => ({
  scaleX: 1.9,
  scaleY: 1.9,
  top: 10 + Math.random() * NOISE_SIZE,
  left: 80 + Math.random() * NOISE_SIZE,
});


// collide takes a node -> returns a function
// the returned function takes
function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
              l = (l - r) / l * .5;
              node.x -= x *= l;
              node.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
          }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
};


// frequency --> color
// between 0 - 255
function freqToColor(freq) {
  var bucket = Math.floor((freq) / 24); // 0 -3
  return COLOR_LIST_2[bucket];
}


var color1 = d3.scale.linear()
      .domain([0, 20])
      .range(COLOR_LIST_1)
      .interpolate(d3.interpolateLab);







function bins_select(binsize, waveform_array) {
  var copy = [];
   for (var i = 0; i < 500; i++) {
      if (i%binsize==0)
        copy.push(waveform_array[i]);
    }
    return copy;
};



var svg = d3.select("body").append("svg")
			.attr("class", "isoco1")
		    .attr("width", CANVAS_WIDTH)
		    .attr("height", CANVAS_HEIGHT);


function hexbin(width, height, waveform_array, ctx) {

  let avg = 0;
  for (let i = 0; i < waveform_array.length; i++) {
    avg += waveform_array[i];
  }
  if (avg < 10) {
    return;
  } 



  var randomX = d3.random.normal(width/2, 300);
  var ps = d3.range(1024).map(function() { return randomX(); });
  

  var points = d3.zip(ps, normalize(height, 0, 0, waveform_array));
  

  

  var hexbin = d3.hexbin()
      .size([width, height])
      .radius(50);

  var radius = d3.scale.linear()
      .domain([0, 20])
      .range([0, 130]);


  var pts = hexbin(points);

  pts.forEach((d) => {
    ctx.save();
    ctx.beginPath();
    
    ctx.fillStyle = color1(d.length);
    ctx.globalAlpha = 0.8-(radius(d.length)/180);

    ctx.translate(d.x, d.y);
    var path = hexbin.hexagon(radius(d.length));
    var p = new Path2D(path);
    ctx.stroke(p);
    ctx.fill(p);


    ctx.closePath();
    ctx.restore();

  })
  
      
};




  function normalize(coef, offset, neg, waveform_array) {

		//https://stackoverflow.com/questions/13368046/how-to-normalize-a-list-of-positive-numbers-in-javascript

		var coef = coef || 1;
		var offset = offset || 0;
		var numbers = waveform_array;
		var numbers2 = [];
		var ratio = Math.max.apply( Math, numbers );
		var l = numbers.length

		for (var i = 0; i < l; i++ ) {
			if (numbers[i] == 0)
				numbers2[i] = 0 + offset;
			else
				numbers2[i] = ((numbers[i]/ratio) * coef) + offset;

			if (i%2 == 0 && neg)
				numbers2[i] = -Math.abs(numbers2[i]);
		}
		return numbers2;
		
	};













const IMG_SRC_1 = require('../test-images/test1.png');
const IMG_SRC_2 = require('../test-images/test2.png');
const IMG_SRC_3 = require('../test-images/test3.jpg');
import GLImage, { loadImage } from '../demo3/gl-image';
import initShaders from './initShaders';
import {common, single} from './initVertexBuffers';
import initTexture from './initTexture';
import { 
  defaultVertexSource, 
  GLSL_FS_brightnessContrast, 
  GLSL_FS_hueSaturation
} from './adjust';


const style = document.createElement('style');
style.innerHTML = 'html body { padding: 0; margin: 0;}';
document.head.appendChild(style);


const canvasEle = document.createElement('canvas');
document.body.appendChild(canvasEle);


debugger;
let glImage = new GLImage(canvasEle);
// let canvasEle = a.getCanvas();

// document.body.appendChild(canvasEle);

window.canvas = canvasEle;





async function start() {
  let oImage = await loadImage(IMG_SRC_1);
  window._width = canvasEle.width = oImage.width;   // 初始化canvas宽高
  window._height = canvasEle.height = oImage.height;
  let gl = glImage.getCanvas().getContext('webgl', {preserveDrawingBuffer: true});
  window._gl = gl;



  let filterArr = [
    {
      name: 'brightnessContrast',
      glsl: {
        vshader: defaultVertexSource,
        fshader: GLSL_FS_brightnessContrast,
        values: {
          brightness: -0.5,
          contrast: 0,
        },
        updateValues: function(brightness, contrast) {
          if (typeof brightness === 'number') {
            this.values.brightness = brightness;
          }
          if (typeof contrast === 'number') {
            this.values.contrast = contrast;
          }
          update();    
        },
      }
    },
    {
      name: 'huesaturation',
      glsl: {
        vshader: defaultVertexSource,
        fshader: GLSL_FS_hueSaturation,
        values: {
          hue: 0,
          saturation: 0,
        },
        updateValues: function(hue, saturation) {
          if (typeof hue === 'number') {
            this.values.hue = hue;
          }
          if (typeof saturation === 'number') {
            this.values.saturation = saturation;
          }
          update();    
        },
      }
    },
  ];

  window.a = filterArr[0];
  window.b = filterArr[1];

  // filterArr = [];

  
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  let imgTexture = initTexture(gl, oImage);

  common(gl);
  filterArr.forEach(item => {
    initShaders(gl, item.glsl);
    single(gl, item.glsl.program);
  });

  
  let tempFramebuffers = [];
  let currentFramebufferIndex = 0;


  update();

  
  function update() {
    filterArr.forEach((item, index) => {
      gl.useProgram(item.glsl.program);
      uniforms(gl, item.glsl.program, item.glsl.values);
  
      drawScene(item.glsl.program, index);
    });
  }


  function uniforms(gl, program, values) {
    for (var name in values) {
      if (!values.hasOwnProperty(name)) continue;
      var location = gl.getUniformLocation(program, name);
      if (location === null) continue; // will be null if the uniform isn't used in the shader
      var value = values[name];
      if (Array.isArray(value)) {
          switch (value.length) {
              case 1: gl.uniform1fv(location, new Float32Array(value)); break;
              case 2: gl.uniform2fv(location, new Float32Array(value)); break;
              case 3: gl.uniform3fv(location, new Float32Array(value)); break;
              case 4: gl.uniform4fv(location, new Float32Array(value)); break;
              case 9: gl.uniformMatrix3fv(location, false, new Float32Array(value)); break;
              case 16: gl.uniformMatrix4fv(location, false, new Float32Array(value)); break;
              default: throw 'dont\'t know how to load uniform "' + name + '" of length ' + value.length;
          }
      } else if (typeof value === 'number') {
          gl.uniform1f(location, value);
      } else {
          throw 'attempted to set uniform "' + name + '" to invalid value ' + (value || 'undefined').toString();
      }
    }


  }


  function drawScene(program, index) {  
    let source = null
    let target = null
    // 第一次渲染时使用图片纹理
    if (index === 0) {
      // 注意这里是在配置图像纹理中注释掉的步骤
      let u_Sampler = gl.getUniformLocation(program, 'texture');
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(u_Sampler, 0);
      source = imgTexture;
    } else {
      // 后续渲染都使用上一次在缓冲中存储的纹理
      source = getTempFramebuffer(currentFramebufferIndex).texture;
    }
    if (index === filterArr.length - 1) {
      target = null;
    } else {
      currentFramebufferIndex = (currentFramebufferIndex + 1) % 2;
      target = getTempFramebuffer(currentFramebufferIndex).fbo;
    }
    gl.bindTexture(gl.TEXTURE_2D, source);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function getTempFramebuffer(index) {
    tempFramebuffers[index] = (
      tempFramebuffers[index] || 
      initFramebufferObject(gl, oImage.width, oImage.height)
    );
    return tempFramebuffers[index]
  }

  

}

start();






function initFramebufferObject(gl, width, height) {
  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  return {
      fbo,
      texture
  };
}



function toImage() {
  let width = window._width;
  let height = window._height;
  const img = new Image();
  img.src = canvas.toDataURL();
  img.width = width;
  img.height = height;

  document.body.appendChild(img);
}


window.toImage = toImage





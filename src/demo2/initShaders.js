let loadShader = function (gl, type, source) {
  // 创建着色器对象
  let shader = gl.createShader(type);
  if (shader == null) {
      console.log('无法创建着色器');
      return null;
  }
  // 设置着色器源代码
  gl.shaderSource(shader, source);
  // 编译着色器
  gl.compileShader(shader);
  // 检查着色器的编译状态
  let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
      let error = gl.getShaderInfoLog(shader);
      console.log('Failed to compile shader: ' + error);
      gl.deleteShader(shader);
      return null;
  }
  return shader;
}

let createProgram = function (gl, vshader, fshader) {
  // 创建着色器对象
  let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
      return null;
  }
  // 创建程序对象
  let program = gl.createProgram();
  if (!program) {
      return null;
  }
  // 为程序对象分配顶点着色器和片元着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 连接着色器
  gl.linkProgram(program);
  // 检查连接
  let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
      let error = gl.getProgramInfoLog(program);
      console.log('无法连接程序对象: ' + error);
      gl.deleteProgram(program);
      gl.deleteShader(fragmentShader);
      gl.deleteShader(vertexShader);
      return null;
  }
  return program;
}
export default function (gl, shaderObj) {
  
  var program = createProgram(gl, shaderObj.vshader, shaderObj.fshader);
  if (!program) {
      console.log('无法创建程序对象');
      return false;
  }

  gl.useProgram(program);
  shaderObj.program = program;

  return true;
}


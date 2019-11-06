export function common(gl) {
  // 顶点着色器的坐标与纹理坐标的映射
  // const vertices = new Float32Array([
  //   -1, 1, 0.0, 1.0,
  //   -1, -1, 0.0, 0.0,
  //   1, 1, 1.0, 1.0,
  //   1, -1, 1.0, 0.0
  // ]);
  // // 创建缓冲区对象
  // let vertexBuffer = gl.createBuffer()
  // // 绑定buffer到缓冲对象上
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // // 向缓冲对象写入数据
  // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array([ 0, 0, 0, 1, 1, 0, 1, 1 ]), 
    gl.STATIC_DRAW
  );
  
}

export function single(gl, program) {

  let vertexAttribute = gl.getAttribLocation(program, 'vertex');
  gl.enableVertexAttribArray(vertexAttribute);
  gl.vertexAttribPointer(vertexAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribPointer(vertexAttribute, 2, gl.FLOAT, false, 0, 0);

  let texCoordAttribute = gl.getAttribLocation(program, '_texCoord');
  gl.enableVertexAttribArray(texCoordAttribute);
  gl.vertexAttribPointer(texCoordAttribute, 2, gl.FLOAT, false, 0, 0);

  // const FSIZE = Float32Array.BYTES_PER_ELEMENT
  // // 将缓冲区对象分配给a_Position变量
  // let a_Position = gl.getAttribLocation(program, 'a_Position')
  // gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
  // // 连接a_Position变量与分配给它的缓冲区对象
  // gl.enableVertexAttribArray(a_Position)
  // // 将缓冲区对象分配给a_TexCoord变量
  // let a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord')
  // gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
  // // 使用缓冲数据建立程序代码到着色器代码的联系
  // gl.enableVertexAttribArray(a_TexCoord);
}


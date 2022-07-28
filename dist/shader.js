export const vertexShaderSource = `#version 300 es

in vec4 a_position;
 
void main() {
 
  gl_Position = a_position;
}
`;
export const fragmentShaderSource = `#version 300 es
 
precision highp float;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(1, 0, 0.5, 1);
}
`;
export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  } else {
    console.error(`failed to creat a shader type ${type}.`);
  }
}
export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  if (program) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  } else {
    console.error(`failed to creat a program.`);
  }
}

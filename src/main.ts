import {
  createProgram,
  createShader,
  fragmentShaderSource,
  vertexShaderSource,
} from "./shader.js";
import { resizeCanvasToDisplaySize } from "./utils.js";

const canvas: HTMLCanvasElement = document.querySelector("#c")!;
const gl = canvas.getContext("webgl2");

function main() {
  console.log("s");
  if (gl) {
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    const program = createProgram(gl, vertexShader!, fragmentShader!);

    const positionAttributeLocation = gl.getAttribLocation(
      program!,
      "a_position"
    );
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [0, 0, 0, 0.5, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.vertexAttribPointer(
      positionAttributeLocation,
      2, // size
      gl.FLOAT, // type
      false, // normalize
      0, // stride
      0 // offset
    );

    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program!);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  } else {
    alert("Cannot use webgl2");
  }
}

main();

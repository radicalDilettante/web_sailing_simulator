import shaderLoader from "./engine/shader_loader.js";
import { fragmentShaderSource } from "./shader/fragment.js";
import { vertexShaderSource } from "./shader/vertex.js";
import { createWindow } from "./engine/window.js";
import Yacht from "./lib/yacht.js";
import { mat4, vec2 } from "./external/glmatrix/index.js";

const canvas: HTMLCanvasElement = document.querySelector("#c")!;
const gl = canvas.getContext("webgl2")!;
if (!gl) alert("Cannot use webgl2");
// const window = new Window(gl);
const yacht = new Yacht(gl);

function main() {
  createWindow(gl);
  const program = shaderLoader(gl, vertexShaderSource, fragmentShaderSource);
  gl.useProgram(program!);
  yacht.createYacht();
  yacht.reset(vec2.fromValues(1, 1), 0);

  const u_projection = gl.getUniformLocation(program!, "projection");
  const projection = mat4.create();
  mat4.ortho(projection, -70, 70, -50, 50, -1, 1);
  gl.uniformMatrix4fv(u_projection, false, projection);
  yacht.renderMesh();
}

main();

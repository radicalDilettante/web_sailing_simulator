import shaderLoader from "./engine/shader_loader.js";
import { fragmentShaderSource } from "./shader/fragment.js";
import { vertexShaderSource } from "./shader/vertex.js";
import Mesh from "./engine/mesh.js";
import { createWindow } from "./engine/window.js";
const canvas = document.querySelector("#c");
const gl = canvas.getContext("webgl2");
if (!gl)
    alert("Cannot use webgl2");
// const window = new Window(gl);
const mesh = new Mesh(gl);
function main() {
    createWindow(gl);
    const program = shaderLoader(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);
}
main();

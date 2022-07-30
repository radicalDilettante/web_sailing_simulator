import { resizeCanvasToDisplaySize } from "./utils.js";
export function createWindow(gl) {
    resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas
    gl.clearColor(0.64, 0.77, 0.86, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
}

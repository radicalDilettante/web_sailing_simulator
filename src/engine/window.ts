import { resizeCanvasToDisplaySize } from "./utils.js";

export function createWindow(gl: WebGL2RenderingContext) {
  resizeCanvasToDisplaySize(gl.canvas);
  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // Clear the canvas
  gl.clearColor(0.64, 0.77, 0.86, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

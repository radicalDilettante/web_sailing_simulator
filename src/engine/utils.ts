import { vec2 } from "../external/glmatrix/index";

export function resizeCanvasToDisplaySize(
  canvas: HTMLCanvasElement,
  multiplier = 1
) {
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

export function toDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

export const ZERO = vec2.fromValues(0, 1);

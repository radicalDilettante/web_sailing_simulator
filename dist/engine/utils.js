import { vec2 } from "../external/glmatrix/index.js";
export function resizeCanvasToDisplaySize(canvas, multiplier = 1) {
    const width = (canvas.clientWidth * multiplier) | 0;
    const height = (canvas.clientHeight * multiplier) | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
export const ZERO = vec2.fromValues(0, 1);
export function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}
export function getSign() {
    let sign = 1;
    if (Math.random() >= 0.5)
        sign = sign * -1;
    return sign;
}
export function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

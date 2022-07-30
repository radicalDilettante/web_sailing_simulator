import shaderLoader from "./engine/shader_loader.js";
import { fragmentShaderSource } from "./shader/fragment.js";
import { vertexShaderSource } from "./shader/vertex.js";
import { createWindow } from "./engine/window.js";
import Yacht from "./lib/yacht.js";
import { mat4, vec2 } from "./external/glmatrix/index.js";
import Mast from "./lib/mast.js";
import Vane from "./lib/vane.js";
import { toRadian } from "./external/glmatrix/common.js";
import Obstacle from "./lib/obstacle.js";
import { getRandomNum, getSign } from "./engine/utils.js";
import Goal from "./lib/goal.js";
// constants
const pointList = [
    vec2.fromValues(-60, -40),
    vec2.fromValues(60, -40),
    vec2.fromValues(60, 40),
    vec2.fromValues(-60, 40),
];
const startDirAngle = [
    toRadian(315),
    toRadian(45),
    toRadian(135),
    toRadian(225),
];
const NUM_OF_OBSTACLES = 20;
// global variables
const obstacleList = [];
const obstacleAABBList = [];
const goalAABB = { center: vec2.create(), length: vec2.create() };
let deltaTime = 0;
let lastTime = 0;
let worldWind = 0;
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");
const canvas = document.querySelector("#c");
const gl = canvas.getContext("webgl2");
if (!gl)
    alert("Cannot use webgl2");
const program = shaderLoader(gl, vertexShaderSource, fragmentShaderSource);
if (!program)
    alert("Cannot load shaders");
const yacht = new Yacht(gl);
const mast = new Mast(gl);
const vane = new Vane(gl);
const goal = new Goal(gl);
function main() {
    createWindow(gl);
    yacht.createYacht();
    mast.createMast();
    vane.createVane();
    reset();
    // add events
    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
        if (keyName === "ArrowUp")
            yacht.turnEngine(true);
        if (keyName === "ArrowLeft")
            yacht.turn("port");
        if (keyName === "ArrowRight")
            yacht.turn("stbd");
    });
    document.addEventListener("keyup", (event) => {
        const keyName = event.key;
        if (keyName === "ArrowUp")
            yacht.turnEngine(false);
    });
    leftButton.addEventListener("click", (e) => {
        e.preventDefault();
        yacht.turn("port");
        yacht.turn("port");
        yacht.turn("port");
    });
    rightButton.addEventListener("click", (e) => {
        e.preventDefault();
        yacht.turn("stbd");
        yacht.turn("stbd");
        yacht.turn("stbd");
    });
    animate(lastTime);
}
function animate(now) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    testCollision();
    testGoal();
    deltaTime = (now - lastTime) * 0.002;
    lastTime = now;
    gl.useProgram(program);
    const u_projection = gl.getUniformLocation(program, "projection");
    const u_model = gl.getUniformLocation(program, "model");
    const projection = mat4.create();
    mat4.ortho(projection, -70, 70, -50, 50, -1, 1);
    gl.uniformMatrix4fv(u_projection, false, projection);
    const model = mat4.create();
    // Render Goal
    gl.uniformMatrix4fv(u_model, false, model);
    goal.renderMesh();
    // Render obstacles
    for (let i = 0; i < NUM_OF_OBSTACLES; i++) {
        obstacleList[i].renderMesh();
    }
    // Render Yacht
    mat4.copy(model, yacht.getModelMatrix(deltaTime, worldWind));
    gl.uniformMatrix4fv(u_model, false, model);
    yacht.renderMesh();
    // Render Mast
    const mastModel = mat4.create();
    mat4.multiply(mastModel, model, mast.getModelMatrix(yacht.getAppWindAngle(worldWind)));
    gl.uniformMatrix4fv(u_model, false, mastModel);
    mast.renderMesh();
    // Render Vane
    const vaneModel = mat4.create();
    mat4.multiply(vaneModel, vaneModel, vane.getModelMatrix(yacht.getCurPos(), worldWind));
    gl.uniformMatrix4fv(u_model, false, vaneModel);
    vane.renderMesh();
    gl.useProgram(null);
    window.requestAnimationFrame(animate);
}
function setObstacles() {
    for (let i = 0; i < NUM_OF_OBSTACLES; i++) {
        const center = vec2.fromValues(getRandomNum(0, 55) * getSign(), getRandomNum(0, 35) * getSign());
        const length = vec2.fromValues(getRandomNum(2, 10), getRandomNum(2, 10));
        const obstacle = new Obstacle(gl);
        const aabb = { center: vec2.create(), length: vec2.create() };
        vec2.copy(aabb.center, center);
        vec2.copy(aabb.length, length);
        obstacle.createObstacle(center, length);
        obstacleList[i] = obstacle;
        obstacleAABBList[i] = aabb;
    }
}
function setGoal(center) {
    const length = vec2.fromValues(10, 10);
    goal.createGoal(center, length);
    vec2.copy(goalAABB.center, center);
    vec2.copy(goalAABB.length, length);
}
function testCollision() {
    for (let i = 0; i < NUM_OF_OBSTACLES; i++) {
        if (yacht.testCollision(obstacleAABBList[i].center, obstacleAABBList[i].length)) {
            console.log("crash!!");
            yacht.crash();
            break;
        }
    }
    if (yacht.testCollisionWithWall()) {
        console.log("Do not go that far!!");
        yacht.crash();
    }
}
function testGoal() {
    if (yacht.testCollision(goalAABB.center, goalAABB.length)) {
        console.log("Success!!");
        reset();
    }
}
function reset() {
    const start = Math.floor(Math.random() * 4); // rand 0~3
    worldWind = toRadian(Math.random() * 360); // rand 0~360
    yacht.reset(pointList[start], startDirAngle[start]);
    setObstacles();
    let finish = 0;
    switch (start) {
        case 0:
            finish = 2;
            break;
        case 1:
            finish = 3;
            break;
        case 2:
            finish = 0;
            break;
        case 3:
            finish = 1;
            break;
    }
    setGoal(pointList[finish]);
}
main();

import Mesh from "../engine/mesh.js";
import * as vec2 from "../external/glmatrix/vec2.js";
import * as vec3 from "../external/glmatrix/vec3.js";
import * as mat4 from "../external/glmatrix/mat4.js";
import { toRadian } from "../external/glmatrix/common.js";
import { toDegrees } from "../engine/utils.js";

const MAX_SPEED = 10;
const CIRCLE_RADIUS = 1;

export default class Yacht extends Mesh {
  private _indices = [0, 1, 2, 2, 3, 4, 0, 2, 4];
  private _vertices = [
    -1.0, 0.0, 0.2, 1.0, 0.0, 0.2, 1.0, 2.0, 0.2, 0.0, 4.0, 0.2, -1.0, 2.0, 0.2,
  ];
  private _colors = [
    0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
  ];
  private _curPos = vec2.fromValues(0, 0);
  private _curAngle = 0; //radians
  // private _curDirVec = vec2.fromValues(0, 1);
  private _prevVelocity = vec2.fromValues(0, 0);
  private _isEngineOn = false;

  constructor(gl: WebGL2RenderingContext) {
    super(gl);
  }

  public createYacht() {
    super.createMesh(this._indices, this._vertices, this._colors);
  }
  public getModelMatrix(deltaTime: number, worldWind: number) {
    const velocity = vec2.create();
    vec2.add(velocity, velocity, this._prevVelocity);
    vec2.add(velocity, velocity, this.getPoweredPropulsion(deltaTime));
    vec2.add(velocity, velocity, this.getWindPropulsion(worldWind, deltaTime));
    vec2.add(velocity, velocity, this.getDrag(deltaTime));

    if (vec2.len(velocity) > MAX_SPEED) {
      const normalizedVelocity = vec2.create();
      vec2.normalize(normalizedVelocity, velocity);
      vec2.scale(velocity, normalizedVelocity, MAX_SPEED);
    }

    const x = this._curPos[0] + velocity[0] * deltaTime;
    const y = this._curPos[1] + velocity[1] * deltaTime;

    const model = mat4.create();
    mat4.translate(model, model, vec3.fromValues(x, y, 0));
    mat4.rotate(model, model, this._curAngle, vec3.fromValues(0, 0, 1));

    vec2.copy(this._prevVelocity, velocity);
    vec2.set(this._curPos, x, y);
    return model;
  }
  public reset(pos: vec2, dirAngle: number) {
    vec2.copy(this._curPos, pos);
    vec2.zero(this._prevVelocity);
    this._curAngle = dirAngle;
  }
  public turn(dir: "port" | "stbd") {
    switch (dir) {
      case "port":
        if (this._curAngle + 0.05 <= 2 * Math.PI) this._curAngle += 0.05;
        else this._curAngle = 0;
        break;
      case "stbd":
        if (this._curAngle - 0.05 >= 0) this._curAngle -= 0.05;
        else this._curAngle = 2 * Math.PI;
        break;
    }
  }
  public turnEngine(isOn: boolean) {
    this._isEngineOn = isOn;
  }
  public getAppWindAngle(worldWind: number) {
    const zero = vec2.fromValues(0, 1);
    const worldWindVec = vec2.create();
    const boatVec = vec2.create();
    const angle = vec2.angle(
      vec2.rotate(worldWindVec, zero, vec2.create(), worldWind),
      vec2.rotate(boatVec, zero, vec2.create(), this._curAngle)
    );

    // console.log(`worldWInd : ${toDegrees(worldWind)}`);
    // console.log(`_curAngle : ${toDegrees(this._curAngle)}`);
    // console.log(`appwind : ${toDegrees(angle)}`);

    return angle;
  }
  public testCollision(boxCenter: vec2, boxLength: vec2) {
    // Detect collision between obstacles(AABB) and yacht(Circle)
    const circlePos = vec2.fromValues(this._curPos[0], this._curPos[1] + 2);
    const boxPoint = vec2.create();

    if (circlePos[0] < boxCenter[0] - boxLength[0] / 2)
      boxPoint[0] = boxCenter[0] - boxLength[0] / 2;
    else if (circlePos[0] > boxCenter[0] + boxLength[0] / 2)
      boxPoint[0] = boxCenter[0] + boxLength[0] / 2;
    else boxPoint[0] = circlePos[0];

    if (circlePos[1] < boxCenter[1] - boxLength[1] / 2)
      boxPoint[1] = boxCenter[1] - boxLength[1] / 2;
    else if (circlePos[1] > boxCenter[1] + boxLength[1] / 2)
      boxPoint[1] = boxCenter[1] + boxLength[1] / 2;
    else boxPoint[1] = circlePos[1];

    const dist = vec2.create();
    vec2.add(dist, circlePos, vec2.scale(boxPoint, boxPoint, -1));

    if (vec2.len(dist) >= CIRCLE_RADIUS) return false;
    else return true;
  }
  public testCollisionWithWall() {
    const circlePos = vec2.fromValues(this._curPos[0], this._curPos[1] + 2);

    if (circlePos[0] - CIRCLE_RADIUS <= -70) return true;
    if (circlePos[0] + CIRCLE_RADIUS >= 70) return true;
    if (circlePos[1] - CIRCLE_RADIUS <= -50) return true;
    if (circlePos[1] + CIRCLE_RADIUS >= 50) return true;
    return false;
  }
  public getCurPos() {
    return this._curPos;
  }
  public crash() {
    vec2.scale(this._prevVelocity, this._prevVelocity, -1);
  }

  private getDrag(deltaTime: number) {
    const drag = vec2.create();

    if (vec2.len(this._prevVelocity) > 0)
      vec2.scale(drag, this._prevVelocity, deltaTime);
    else vec2.set(drag, 0, 0);
    vec2.scale(drag, drag, -1);

    return drag;
  }
  private getPoweredPropulsion(deltaTime: number) {
    const propulsion = vec2.create();
    if (this._isEngineOn) {
      const engineSpeed = 2 * deltaTime;
      vec2.set(propulsion, 0, engineSpeed);
      vec2.rotate(propulsion, propulsion, vec2.create(), this._curAngle);
    } else {
      vec2.set(propulsion, 0, 0);
    }
    return propulsion;
  }
  private getWindPropulsion(worldWind: number, deltaTime: number) {
    const appWindAngle = this.getAppWindAngle(worldWind);
    const propulsion = vec2.create();
    if (appWindAngle >= toRadian(-40) && appWindAngle <= toRadian(40))
      vec2.set(propulsion, 0, 6);
    else if (appWindAngle >= toRadian(-90) && appWindAngle <= toRadian(90))
      vec2.set(propulsion, 0, 5);
    else if (appWindAngle >= toRadian(-130) && appWindAngle <= toRadian(130))
      vec2.set(propulsion, 0, 4);
    else if (appWindAngle >= toRadian(-150) && appWindAngle <= toRadian(150))
      vec2.set(propulsion, 0, 3);
    else vec2.set(propulsion, 0, 0);

    vec2.rotate(propulsion, propulsion, vec2.create(), this._curAngle);
    vec2.scale(propulsion, propulsion, deltaTime);
    return propulsion;
  }
}

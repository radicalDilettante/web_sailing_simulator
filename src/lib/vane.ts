import Mesh from "../engine/mesh";
import { ZERO } from "../engine/utils";
import { mat4, vec2, vec3 } from "../external/glmatrix/index";

export default class Vane extends Mesh {
  private _indices = [0, 1, 2, 0, 2, 6, 4, 5, 3];

  private _vertices = [
    -2.0, -15.0, 0.2, 2.0, -15.0, 0.2, 2.0, -9.0, 0.2, 4.0, -9.0, 0.2, 0.0,
    -5.0, 0.2, -4.0, -9.0, 0.2, -2.0, -9.0, 0.2,
  ];

  private _colors = [
    0.53, 0.61, 0.5, 0.53, 0.61, 0.5, 0.53, 0.61, 0.5, 0.53, 0.61, 0.5, 0.53,
    0.61, 0.5, 0.53, 0.61, 0.5, 0.53, 0.61, 0.5,
  ];

  constructor(gl: WebGL2RenderingContext) {
    super(gl);
  }

  public createVane(pos: vec2, length: vec2) {
    super.createMesh(this._vertices, this._colors, this._indices);
  }

  public getModelMatrix(pos: vec2, worldWind: vec2) {
    const normalizedWorldWind = vec2.create();
    vec2.normalize(normalizedWorldWind, worldWind);
    const angle = vec2.angle(ZERO, normalizedWorldWind);

    const model = mat4.create();
    mat4.translate(model, model, vec3.fromValues(pos[0], pos[1] + 2, 0));
    mat4.fromZRotation(model, angle);

    return model;
  }
}

import Mesh from "../engine/mesh.js";
import { ZERO } from "../engine/utils.js";
import { mat4, vec2, vec3 } from "../external/glmatrix/index.js";

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

  public createVane() {
    super.createMesh(this._indices, this._vertices, this._colors);
  }

  public getModelMatrix(pos: vec2, worldWind: number) {
    const model = mat4.create();
    mat4.translate(model, model, vec3.fromValues(pos[0], pos[1] + 2, 0));
    mat4.rotate(model, model, worldWind, vec3.fromValues(0, 0, 1));

    return model;
  }
}

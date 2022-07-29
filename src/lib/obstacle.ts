import Mesh from "../engine/mesh.js";

export default class Obstacle extends Mesh {
  private _indices = [0, 1, 2, 0, 2, 3];

  private _colors = [
    0.02, 0.3, 0.21, 0.02, 0.3, 0.21, 0.02, 0.3, 0.21, 0.02, 0.3, 0.21,
  ];

  constructor(gl: WebGL2RenderingContext) {
    super(gl);
  }

  public createObstacle(center: vec2, length: vec2) {
    const vertices = [
      center[0] - length[0] / 2,
      center[1] - length[1] / 2,
      0.1,
      center[0] + length[0] / 2,
      center[1] - length[1] / 2,
      0.1,
      center[0] + length[0] / 2,
      center[1] + length[1] / 2,
      0.1,
      center[0] - length[0] / 2,
      center[1] + length[1] / 2,
      0.1,
    ];

    super.createMesh(vertices, this._colors, this._indices);
  }
}

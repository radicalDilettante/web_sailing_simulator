import Mesh from "../engine/mesh.js";
export default class Goal extends Mesh {
    constructor(gl) {
        super(gl);
        this._indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7];
        this._colors = [
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.64, 0.77,
            0.86, 0.64, 0.77, 0.86, 0.64, 0.77, 0.86, 0.64, 0.77, 0.86,
        ];
    }
    createGoal(center, length) {
        const vertices = [
            center[0] - length[0] / 2,
            center[1] - length[1] / 2,
            0,
            center[0] + length[0] / 2,
            center[1] - length[1] / 2,
            0,
            center[0] + length[0] / 2,
            center[1] + length[1] / 2,
            0,
            center[0] - length[0] / 2,
            center[1] + length[1] / 2,
            0,
            center[0] - length[0] / 2 + 1,
            center[1] - length[1] / 2 + 1,
            0.1,
            center[0] + length[0] / 2 - 1,
            center[1] - length[1] / 2 + 1,
            0.1,
            center[0] + length[0] / 2 - 1,
            center[1] + length[1] / 2 - 1,
            0.1,
            center[0] - length[0] / 2 + 1,
            center[1] + length[1] / 2 - 1,
            0.1,
        ];
        super.createMesh(this._indices, vertices, this._colors);
    }
}

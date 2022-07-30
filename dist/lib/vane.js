import Mesh from "../engine/mesh.js";
import { mat4, vec3 } from "../external/glmatrix/index.js";
export default class Vane extends Mesh {
    constructor(gl) {
        super(gl);
        this._indices = [0, 1, 2, 0, 2, 6, 4, 5, 3];
        this._vertices = [
            -2.0, -15.0, 0.2, 2.0, -15.0, 0.2, 2.0, -9.0, 0.2, 4.0, -9.0, 0.2, 0.0,
            -5.0, 0.2, -4.0, -9.0, 0.2, -2.0, -9.0, 0.2,
        ];
        this._colors = [
            0.53, 0.61, 0.5, 0.53, 0.61, 0.5, 0.53, 0.61, 0.5, 0.53, 0.61, 0.5, 0.53,
            0.61, 0.5, 0.53, 0.61, 0.5, 0.53, 0.61, 0.5,
        ];
    }
    createVane() {
        super.createMesh(this._indices, this._vertices, this._colors);
    }
    getModelMatrix(pos, worldWind) {
        const model = mat4.create();
        mat4.translate(model, model, vec3.fromValues(pos[0], pos[1] + 2, 0));
        mat4.rotate(model, model, worldWind, vec3.fromValues(0, 0, 1));
        return model;
    }
}

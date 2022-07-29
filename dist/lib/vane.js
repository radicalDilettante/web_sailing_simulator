import Mesh from "../engine/mesh.js";
import { ZERO } from "../engine/utils.js";
import { mat4, vec2, vec3 } from "../external/glmatrix/index.js";
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
    createVane(pos, length) {
        super.createMesh(this._vertices, this._colors, this._indices);
    }
    getModelMatrix(pos, worldWind) {
        const normalizedWorldWind = vec2.create();
        vec2.normalize(normalizedWorldWind, worldWind);
        const angle = vec2.angle(ZERO, normalizedWorldWind);
        const model = mat4.create();
        mat4.translate(model, model, vec3.fromValues(pos[0], pos[1] + 2, 0));
        mat4.fromZRotation(model, angle);
        return model;
    }
}

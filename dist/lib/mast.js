import Mesh from "../engine/mesh.js";
import { toDegrees } from "../engine/utils.js";
import { toRadian } from "../external/glmatrix/common.js";
import { mat4, vec3 } from "../external/glmatrix/index.js";
export default class Mast extends Mesh {
    constructor(gl) {
        super(gl);
        this._indices = [0, 1, 2, 0, 2, 3];
        this._vertices = [
            -0.15, 0.0, 0.3, -0.15, -3.0, 0.3, 0.15, -3.0, 0.3, 0.15, 0.0, 0.3,
        ];
        this._colors = [
            1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        ];
    }
    createMast() {
        super.createMesh(this._indices, this._vertices, this._colors);
    }
    getModelMatrix(angle) {
        const windAngle = toDegrees(angle);
        let mastAngle;
        if (windAngle <= -150)
            mastAngle = 0.0;
        else if (windAngle < 150)
            mastAngle = (-90 / 150) * windAngle + 90;
        else
            mastAngle = 0;
        const model = mat4.create();
        mat4.translate(model, model, vec3.fromValues(0, 2, 0));
        mat4.rotate(model, model, toRadian(mastAngle), vec3.fromValues(0, 0, 1));
        return model;
    }
}

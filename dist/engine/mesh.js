export default class Mesh {
    constructor(gl) {
        this._gl = gl;
        this._vao = null;
        this._indexBuffer = null;
        this._positionBuffer = null;
        this._colorBuffer = null;
        this._indexCount = 0;
    }
    createMesh(indices, vertices, colors) {
        this._indexCount = indices.length;
        this._vao = this._gl.createVertexArray();
        this._gl.bindVertexArray(this._vao);
        this._indexBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this._gl.STATIC_DRAW);
        this._positionBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(vertices), this._gl.STATIC_DRAW);
        this._gl.enableVertexAttribArray(0);
        this._gl.vertexAttribPointer(0, 3, // size
        this._gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
        );
        this._colorBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._colorBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(colors), this._gl.STATIC_DRAW);
        this._gl.enableVertexAttribArray(1);
        this._gl.vertexAttribPointer(1, 3, // size
        this._gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
        );
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        this._gl.bindVertexArray(null);
    }
    renderMesh() {
        this._gl.bindVertexArray(this._vao);
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        this._gl.drawElements(this._gl.TRIANGLES, this._indexCount, this._gl.UNSIGNED_SHORT, 0);
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
        this._gl.bindVertexArray(null);
    }
}

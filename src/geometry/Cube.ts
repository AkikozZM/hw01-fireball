import Drawable from "../rendering/gl/Drawable";
import { gl } from '../globals';
import {vec3, vec4} from 'gl-matrix';

class Cube extends Drawable {
    indices: Uint32Array;
    positions: Float32Array;
    normals: Float32Array;
    center: vec4;
    constructor(center: vec3) {
        super();
        this.center = vec4.fromValues(center[0], center[1], center[2], 1);
    }
    create(): void {
        
        this.positions = new Float32Array([
            // Front face
            -1, -1,  1, 1,
             1, -1,  1, 1,
             1,  1,  1, 1,
            -1,  1,  1, 1,
            // Back face
            -1, -1, -1, 1,
             1, -1, -1, 1,
             1,  1, -1, 1,
            -1,  1, -1, 1,
            // Left face
            -1, -1, -1, 1,
            -1, -1,  1, 1,
            -1,  1,  1, 1,
            -1,  1, -1, 1,
            // Right face
             1, -1,  1, 1,
             1, -1, -1, 1,
             1,  1, -1, 1,
             1,  1,  1, 1,
            // Top face
            -1,  1,  1, 1,
             1,  1,  1, 1,
             1,  1, -1, 1,
            -1,  1, -1, 1,
            // Bottom face
            -1, -1,  1, 1,
             1, -1,  1, 1,
             1, -1, -1, 1,
            -1, -1, -1, 1,
        ]);
        for (let i = 0; i < this.positions.length; i += 4) {
            this.positions[i] += this.center[0];
            this.positions[i+1] += this.center[1];
            this.positions[i+2] += this.center[2];
        }
        this.normals = new Float32Array([
            // Front face
             0,  0,  1, 0,
             0,  0,  1, 0,
             0,  0,  1, 0,
             0,  0,  1, 0,
            // Back face
             0,  0, -1, 0,
             0,  0, -1, 0,
             0,  0, -1, 0,
             0,  0, -1, 0,
            // Left face
            -1,  0,  0, 0,
            -1,  0,  0, 0,
            -1,  0,  0, 0,
            -1,  0,  0, 0,
            // Right face
             1,  0,  0, 0,
             1,  0,  0, 0,
             1,  0,  0, 0,
             1,  0,  0, 0,
            // Top face
             0,  1,  0, 0,
             0,  1,  0, 0,
             0,  1,  0, 0,
             0,  1,  0, 0,
            // Bottom face
             0, -1,  0, 0,
             0, -1,  0, 0,
             0, -1,  0, 0,
             0, -1,  0, 0,    
        ]);
        this.indices = new Uint32Array([
            0,  1,  2,  0,  2,  3,
            4,  5,  6,  4,  6,  7,
            8,  9, 10,  8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,
        ]);
        this.generateIdx();
        this.generatePos();
        this.generateNor();
        this.count = this.indices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    
        // Bind and set buffer data for positions
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);
    
        // Bind and set buffer data for normals
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    }
}
export default Cube;
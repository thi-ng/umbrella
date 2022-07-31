import type { GLVec3 } from "./glsl.js";

export interface Material {
	ambientCol: GLVec3;
	diffuseCol: GLVec3;
	specularCol: GLVec3;
}

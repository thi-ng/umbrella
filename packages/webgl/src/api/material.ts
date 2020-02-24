import type { GLVec3 } from "./glsl";

export interface Material {
    ambientCol: GLVec3;
    diffuseCol: GLVec3;
    specularCol: GLVec3;
}

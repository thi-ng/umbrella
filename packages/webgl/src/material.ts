import { GLSL, Material, ShaderUniformSpecs } from "./api";

export const DEFAULT_MATERIAL: Material = {
    ambientCol: [0.1, 0.1, 0.1],
    diffuseCol: [0.8, 0.8, 0.8],
    specularCol: [1, 1, 1]
};

const TYPES: Record<keyof Material, GLSL> = {
    ambientCol: GLSL.vec3,
    diffuseCol: GLSL.vec3,
    specularCol: GLSL.vec3
};

export const defMaterial = (
    mat: Partial<Material> = {},
    flags: Partial<Record<keyof Material, boolean>> = {},
    base = DEFAULT_MATERIAL
): ShaderUniformSpecs =>
    Object.keys(base).reduce((acc, id) => {
        flags[id] !== false && (acc[id] = [TYPES[id], mat[id] || base[id]]);
        return acc;
    }, {});

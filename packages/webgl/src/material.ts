import type { GLSL } from "./api/glsl.js";
import type { Material } from "./api/material.js";
import type { ShaderUniformSpecs } from "./api/shader.js";

export const DEFAULT_MATERIAL: Material = {
	ambientCol: [0.1, 0.1, 0.1],
	diffuseCol: [0.8, 0.8, 0.8],
	specularCol: [1, 1, 1],
};

const TYPES: Record<keyof Material, GLSL> = {
	ambientCol: "vec3",
	diffuseCol: "vec3",
	specularCol: "vec3",
};

export const defMaterial = (
	mat: Partial<Material> = {},
	flags: Partial<Record<keyof Material, boolean>> = {},
	base = DEFAULT_MATERIAL
): ShaderUniformSpecs =>
	Object.keys(base).reduce((acc: any, id) => {
		(<any>flags)[id] !== false &&
			(acc[id] = [(<any>TYPES)[id], (<any>mat)[id] || (<any>base)[id]]);
		return acc;
	}, {});

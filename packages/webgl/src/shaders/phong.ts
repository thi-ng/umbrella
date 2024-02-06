import type { Sym } from "@thi.ng/shader-ast";
import { F, M4, V3 } from "@thi.ng/shader-ast/api/types";
import { diffuseLighting } from "@thi.ng/shader-ast-stdlib/light/lambert";
import { surfaceNormal } from "@thi.ng/shader-ast-stdlib/matrix/normal";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defMain } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { add, gt, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $ } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { dot, max, normalize, pow } from "@thi.ng/shader-ast/builtin/math";
import type { Material } from "../api/material.js";
import type { ShaderPresetOpts, ShaderSpec } from "../api/shader.js";
import { defMaterial } from "../material.js";
import { autoNormalMatrix1 } from "../matrices.js";
import { colorAttrib, positionAttrib } from "../utils.js";

export type PhongOpts = ShaderPresetOpts<
	Pick<Material, "ambientCol" | "diffuseCol" | "specularCol">
>;

export const PHONG = (opts: Partial<PhongOpts> = {}): ShaderSpec => ({
	vs: (gl, unis, ins, outs) => [
		defMain(() => {
			let worldPos: Sym<"vec4">;
			return [
				(worldPos = sym(
					mul(unis.model, vec4(positionAttrib(opts, ins), 1))
				)),
				assign(outs.vnormal, surfaceNormal(ins.normal, unis.normalMat)),
				assign(outs.vlight, sub(unis.lightPos, $(worldPos, "xyz"))),
				assign(outs.veye, sub(unis.eyePos, $(worldPos, "xyz"))),
				assign(outs.vcolor, colorAttrib(opts, ins, unis.diffuseCol)),
				assign(
					gl.gl_Position,
					mul(mul(unis.proj, unis.view), worldPos)
				),
			];
		}),
	],
	fs: (_, unis, ins, outs) => [
		defMain(() => {
			let normal: Sym<"vec3">;
			let light: Sym<"vec3">;
			let directional: Sym<"float">;
			let specular: Sym<"float">;
			return [
				(normal = sym(normalize(ins.vnormal))),
				(light = sym(normalize(ins.vlight))),
				(directional = sym(max(dot(normal, light), FLOAT0))),
				(specular = sym(
					ternary(
						gt(directional, FLOAT0),
						pow(
							dot(
								normal,
								normalize(add(light, normalize(ins.veye)))
							),
							unis.shininess
						),
						FLOAT0
					)
				)),
				assign(
					outs.fragColor,
					vec4(
						add(
							diffuseLighting(
								directional,
								ins.vcolor,
								unis.lightCol,
								unis.ambientCol
							),
							mul(unis.specularCol, specular)
						),
						1
					)
				),
			];
		}),
	],
	attribs: {
		position: V3,
		normal: V3,
		...(opts.color && !opts.instanceColor ? { [opts.color]: V3 } : null),
		...(opts.instancePos ? { [opts.instancePos]: V3 } : null),
		...(opts.instanceColor ? { [opts.instanceColor]: V3 } : null),
	},
	varying: {
		vnormal: V3,
		veye: V3,
		vlight: V3,
		vcolor: V3,
	},
	uniforms: {
		model: M4,
		normalMat: [M4, autoNormalMatrix1()],
		view: M4,
		proj: M4,
		shininess: [F, 32],
		eyePos: V3,
		lightPos: [V3, [0, 0, 2]],
		lightCol: [V3, [1, 1, 1]],
		...defMaterial(opts.material),
	},
	state: {
		depth: true,
		cull: true,
		...opts.state,
	},
});

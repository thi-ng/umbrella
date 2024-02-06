import {
	diffuseLighting,
	halfLambert,
	lambert,
} from "@thi.ng/shader-ast-stdlib/light/lambert";
import { transformMVP } from "@thi.ng/shader-ast-stdlib/matrix/mvp";
import { surfaceNormal } from "@thi.ng/shader-ast-stdlib/matrix/normal";
import { M4, S2D, V2, V3 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain } from "@thi.ng/shader-ast/ast/function";
import { vec4 } from "@thi.ng/shader-ast/ast/lit";
import { mul } from "@thi.ng/shader-ast/ast/ops";
import { $ } from "@thi.ng/shader-ast/ast/swizzle";
import { normalize } from "@thi.ng/shader-ast/builtin/math";
import { texture } from "@thi.ng/shader-ast/builtin/texture";
import type { Material } from "../api/material.js";
import type { ShaderPresetOpts, ShaderSpec } from "../api/shader.js";
import { defMaterial } from "../material.js";
import { autoNormalMatrix2 } from "../matrices.js";
import { colorAttrib, positionAttrib } from "../utils.js";

export interface LambertOpts
	extends ShaderPresetOpts<Pick<Material, "ambientCol" | "diffuseCol">> {
	bidir: boolean;
}

export const LAMBERT = (opts: Partial<LambertOpts> = {}): ShaderSpec => ({
	vs: (gl, unis, ins, outs) => [
		defMain(() => [
			opts.uv ? assign(outs.vuv, ins[opts.uv]) : null,
			assign(outs.vcolor, colorAttrib(opts, ins, unis.diffuseCol)),
			assign(outs.vnormal, surfaceNormal(ins.normal, unis.normalMat)),
			assign(
				gl.gl_Position,
				transformMVP(
					positionAttrib(opts, ins),
					unis.model,
					unis.view,
					unis.proj
				)
			),
		]),
	],
	fs: (_, unis, ins, outs) => [
		defMain(() => [
			assign(
				outs.fragColor,
				vec4(
					diffuseLighting(
						(opts.bidir !== false ? halfLambert : lambert)(
							normalize(ins.vnormal),
							unis.lightDir
						),
						opts.uv
							? mul(
									$(texture(unis.tex, ins.vuv), "xyz"),
									ins.vcolor
							  )
							: ins.vcolor,
						unis.lightCol,
						unis.ambientCol
					),
					1
				)
			),
		]),
	],
	// pre: ALIAS_TEXTURE,
	attribs: {
		position: V3,
		normal: V3,
		...(opts.uv ? { [opts.uv]: V2 } : null),
		...(opts.color && !opts.instanceColor ? { [opts.color]: V3 } : null),
		...(opts.instancePos ? { [opts.instancePos]: V3 } : null),
		...(opts.instanceColor ? { [opts.instanceColor]: V3 } : null),
	},
	varying: {
		vcolor: V3,
		vnormal: V3,
		...(opts.uv ? { vuv: V2 } : null),
	},
	uniforms: {
		model: M4,
		view: M4,
		proj: M4,
		normalMat: [M4, autoNormalMatrix2()],
		lightDir: [V3, [0, 1, 0]],
		lightCol: [V3, [1, 1, 1]],
		...defMaterial(
			{ diffuseCol: [1, 1, 1], ...opts.material },
			{ specularCol: false }
		),
		...(opts.uv ? { tex: S2D } : null),
	},
	state: {
		depth: true,
		cull: true,
		...opts.state,
	},
});

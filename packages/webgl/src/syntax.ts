import { isArray } from "@thi.ng/checks/is-array";
import { GLSLVersion } from "@thi.ng/shader-ast-glsl/api";
import type { GLSL } from "./api/glsl.js";
import type { GLSLDeclPrefixes, GLSLSyntax } from "./api/shader.js";

export const PREFIXES: GLSLDeclPrefixes = {
	a: "a_",
	v: "v_",
	u: "u_",
	o: "o_",
};

export const NO_PREFIXES: GLSLDeclPrefixes = {
	a: "",
	v: "",
	u: "",
	o: "",
};

/**
 * GLSL data declaration code generators.
 */
export const SYNTAX: Record<GLSLVersion, GLSLSyntax> = {
	/**
	 * WebGL (GLSL ES 1.0)
	 */
	[GLSLVersion.GLES_100]: {
		number: 100,
		attrib: (id, type, pre) =>
			`attribute ${isArray(type) ? type[0] : type} ${pre.a}${id};`,
		varying: {
			vs: (id, type, pre) => arrayDecl("varying", type, pre.v + id),
			fs: (id, type, pre) => arrayDecl("varying", type, pre.v + id),
		},
		uniform: (id, u, pre) => arrayDecl("uniform", <any>u, pre.u + id),
		output: (id, type, pre) =>
			isArray(type)
				? `#define ${pre.o}${id} gl_FragData[${type[1]}]`
				: "",
	},
	/**
	 * WebGL 2 (GLSL ES 3)
	 */
	[GLSLVersion.GLES_300]: {
		number: 300,
		attrib: (id, type, pre) =>
			isArray(type)
				? `layout(location=${type[1]}) in ${type[0]} ${pre.a}${id};`
				: `in ${type} ${pre.a}${id};`,
		varying: {
			vs: (id, type, pre) => arrayDecl("out", type, pre.v + id),
			fs: (id, type, pre) => arrayDecl("in", type, pre.v + id),
		},
		uniform: (id, u, pre) => arrayDecl("uniform", <any>u, pre.u + id),
		output: (id, type, pre) =>
			isArray(type)
				? `layout(location=${type[1]}) out ${type[0]} ${pre.o}${id};`
				: `out ${type} ${pre.o}${id};`,
	},
};

const arrayDecl = (
	qualifier: string,
	decl: GLSL | [GLSL, number],
	id: string
) => {
	const type = isArray(decl) ? decl[0] : decl;
	return type.indexOf("[]") > 0
		? `${qualifier} ${type.replace("[]", "")} ${id}[${
				(<[GLSL, number]>decl)[1]
		  }];`
		: `${qualifier} ${type} ${id};`;
};

/**
 * GLSL preprocessor macro for conditional execution based on `__VERSION__`.
 *
 * @param ver -
 * @param ok -
 * @param fail -
 */
export const VERSION_CHECK = (ver: number, ok: string, fail = "") => {
	let cmp = ">=";
	if (!ok) {
		ok = fail;
		fail = <any>null;
		cmp = "<";
	}
	return `#if __VERSION__ ${cmp} ${ver}
${ok}${fail ? `\n#else\n${fail}` : ""}
#endif`;
};

export const ALIAS_TEXTURE = VERSION_CHECK(
	300,
	"",
	"#define texture texture2D"
);

/**
 * GLSL version specific fragment shader output. If `__VERSION__ >= 300`
 * assigns `body` to `out`, else to `gl_FragColor`.
 *
 * @param body -
 * @param out -
 */
export const EXPORT_FRAGCOL = (body = "col", out = "o_fragColor") =>
	VERSION_CHECK(300, `${out}=${body};`, `gl_FragColor=${body};`);

/**
 * Default GLSL prelude.
 */
export const GLSL_HEADER = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp int;
precision highp float;
#else
precision mediump int;
precision mediump float;
#endif
${VERSION_CHECK(300, "precision lowp sampler3D;")}
#ifndef PI
#define PI 3.141592653589793
#endif
#ifndef TAU
#define TAU 6.283185307179586
#endif
#ifndef HALF_PI
#define HALF_PI 1.570796326794896
#endif
`;

import type { Fn, Fn3, IObjectOf, Maybe, Nullable } from "@thi.ng/api";
import { equivArrayLike } from "@thi.ng/equiv";
import { IDENT22, IDENT33, IDENT44 } from "@thi.ng/matrices/constants";
import { ZERO2, ZERO3, ZERO4, type ReadonlyVec } from "@thi.ng/vectors/api";
import type { GLVec } from "./api/glsl.js";
import type { UniformValue } from "./api/shader.js";

type SetterS = "f" | "i" | "ui";

type SetterV =
	| "1fv"
	| "2fv"
	| "3fv"
	| "4fv"
	| "1iv"
	| "2iv"
	| "3iv"
	| "4iv"
	| "1uiv"
	| "2uiv"
	| "3uiv"
	| "4uiv";

type SetterM = "2fv" | "3fv" | "4fv";

/** @internal */
const __uniformS =
	(fn: SetterS) =>
	(gl: WebGLRenderingContext, loc: WebGLUniformLocation, defaultVal = 0) => {
		let prev: number;
		return (x?: number) => {
			x = x === undefined ? defaultVal : x;
			if (x !== prev) {
				(<any>gl)["uniform1" + fn](loc, x);
				prev = x;
			}
		};
	};

/** @internal */
const __uniformV =
	(fn: SetterV, sysDefault: ReadonlyVec) =>
	(
		gl: WebGLRenderingContext,
		loc: WebGLUniformLocation,
		defaultVal = sysDefault
	) => {
		let prev: GLVec = [];
		return (x?: ReadonlyVec) => {
			x = x === undefined ? defaultVal : x;
			if (!equivArrayLike(prev, x)) {
				(<any>gl)["uniform" + fn](loc, x);
				prev = [...x];
			}
		};
	};

/** @internal */
const __uniformM =
	(fn: SetterM, sysDefault?: ReadonlyVec) =>
	(
		gl: WebGLRenderingContext,
		loc: WebGLUniformLocation,
		defaultVal = sysDefault
	) => {
		let prev: GLVec = [];
		return (x?: any) => {
			x = x === undefined ? defaultVal : x;
			if (!equivArrayLike(prev, x)) {
				(<any>gl)["uniformMatrix" + fn](loc, false, x);
				prev = [...x];
			}
		};
	};

const Z1 = [0];

export const UNIFORM_SETTERS: IObjectOf<
	Fn3<
		WebGLRenderingContext,
		WebGLUniformLocation,
		Maybe<number | ReadonlyVec>,
		Fn<Nullable<UniformValue>, void>
	>
> = <any>{
	bool: __uniformS("i"),
	float: __uniformS("f"),
	int: __uniformS("i"),
	uint: __uniformS("ui"),
	bvec2: __uniformV("2iv", ZERO2),
	bvec3: __uniformV("3iv", ZERO3),
	bvec4: __uniformV("4iv", ZERO4),
	ivec2: __uniformV("2iv", ZERO2),
	ivec3: __uniformV("3iv", ZERO3),
	ivec4: __uniformV("4iv", ZERO4),
	vec2: __uniformV("2fv", ZERO2),
	vec3: __uniformV("3fv", ZERO3),
	vec4: __uniformV("4fv", ZERO4),
	mat2: __uniformM("2fv", IDENT22),
	mat3: __uniformM("3fv", IDENT33),
	mat4: __uniformM("4fv", IDENT44),
	sampler2D: __uniformS("i"),
	sampler2DShadow: __uniformS("i"),
	sampler3D: __uniformS("i"),
	samplerCube: __uniformS("i"),
	samplerCubeShadow: __uniformS("i"),
	"bool[]": __uniformV("1iv", Z1),
	"float[]": __uniformV("1fv", Z1),
	"int[]": __uniformV("1iv", Z1),
	"uint[]": __uniformV("1uiv", Z1),
	"bvec2[]": __uniformV("2iv", ZERO2),
	"bvec3[]": __uniformV("3iv", ZERO3),
	"bvec4[]": __uniformV("4iv", ZERO4),
	"ivec2[]": __uniformV("2iv", ZERO2),
	"ivec3[]": __uniformV("3iv", ZERO3),
	"ivec4[]": __uniformV("4iv", ZERO4),
	"vec2[]": __uniformV("2fv", ZERO2),
	"vec3[]": __uniformV("3fv", ZERO3),
	"vec4[]": __uniformV("4fv", ZERO4),
	"mat2[]": __uniformM("2fv", ZERO2),
	"mat3[]": __uniformM("3fv", ZERO3),
	"mat4[]": __uniformM("4fv", ZERO4),
	"sampler2D[]": __uniformV("1iv", Z1),
	"sampler2DShadow[]": __uniformV("1iv", Z1),
	"sampler3D[]": __uniformV("1iv", Z1),
	"samplerCube[]": __uniformV("1iv", Z1),
	"samplerCubeShadow[]": __uniformV("1iv", Z1),
};

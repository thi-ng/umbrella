import type { Sym } from "./nodes.js";
import type { Interpolation, Precision } from "./precision.js";

export type SymQualifier = "in" | "out" | "inout";

export type SymType = "in" | "out" | "uni";

export type BoolSym = Sym<"bool">;
export type FloatSym = Sym<"float">;
export type IntSym = Sym<"int">;
export type UintSym = Sym<"uint">;
export type Vec2Sym = Sym<"vec2">;
export type Vec3Sym = Sym<"vec3">;
export type Vec4Sym = Sym<"vec4">;
export type IVec2Sym = Sym<"ivec2">;
export type IVec3Sym = Sym<"ivec3">;
export type IVec4Sym = Sym<"ivec4">;
export type UVec2Sym = Sym<"uvec2">;
export type UVec3Sym = Sym<"uvec3">;
export type UVec4Sym = Sym<"uvec4">;
export type BVec2Sym = Sym<"bvec2">;
export type BVec3Sym = Sym<"bvec3">;
export type BVec4Sym = Sym<"bvec4">;
export type Mat2Sym = Sym<"mat2">;
export type Mat3Sym = Sym<"mat3">;
export type Mat4Sym = Sym<"mat4">;
export type Sampler2DSym = Sym<"sampler2D">;
export type Sampler3DSym = Sym<"sampler3D">;
export type SamplerCubeSym = Sym<"samplerCube">;
export type ISampler2DSym = Sym<"isampler2D">;
export type ISampler3DSym = Sym<"isampler3D">;
export type ISamplerCubeSym = Sym<"isamplerCube">;
export type USampler2DSym = Sym<"usampler2D">;
export type USampler3DSym = Sym<"usampler3D">;
export type USamplerCubeSym = Sym<"usamplerCube">;

export interface SymOpts {
	/**
	 * If in global scope, used for:
	 *
	 * - `in` => attribute (in VS), varying (in FS)
	 * - `out` => varying (in VS), output (in FS)
	 *
	 * For parameters / fn args:
	 *
	 * - `in` =>  passed into a function
	 * - `out` => passed back out of a function, but not initialized
	 * - `inout` => passed both into and out of a function
	 */
	q?: SymQualifier;
	/**
	 * Symbol type, only used for global scope in/out vars, e.g.
	 * attribute, varying, uniform.
	 */
	type?: SymType;
	/**
	 * Const symbol
	 */
	const?: boolean;
	/**
	 * Precision qualifier
	 */
	prec?: Precision;
	/**
	 * Interpolation qualifier
	 */
	smooth?: Interpolation;
	/**
	 * Arrays only. Length
	 */
	num?: number;
	/**
	 * Layout location
	 */
	loc?: number;
}

import type { Tuple } from "@thi.ng/api";
import type { Type } from "@thi.ng/shader-ast";

export type GLSL = Type;

export type GLVec = number[] | Float32Array;
export type GLVec2 = Tuple<number, 2> | Float32Array;
export type GLVec3 = Tuple<number, 3> | Float32Array;
export type GLVec4 = Tuple<number, 4> | Float32Array;

export type GLIntVec = number[] | Int32Array;
export type GLUintVec = number[] | Uint32Array;
export type GLIntVec2 = Tuple<number, 2> | Int32Array;
export type GLIntVec3 = Tuple<number, 3> | Int32Array;
export type GLIntVec4 = Tuple<number, 4> | Int32Array;

export type GLMat2 = Tuple<number, 4> | Float32Array;
export type GLMat3 = Tuple<number, 9> | Float32Array;
export type GLMat4 = Tuple<number, 16> | Float32Array;
export type GLMat23 = Tuple<number, 6> | Float32Array;
export type GLMat24 = Tuple<number, 8> | Float32Array;
export type GLMat34 = Tuple<number, 12> | Float32Array;

export type GLSLScalarType =
	| "bool"
	| "float"
	| "int"
	| "uint"
	| "sampler2D"
	| "samplerCube";

export type GLSLArrayType =
	| "bool[]"
	| "int[]"
	| "uint[]"
	| "float[]"
	| "bvec2[]"
	| "bvec3[]"
	| "bvec4[]"
	| "ivec2[]"
	| "ivec3[]"
	| "ivec4[]"
	| "uvec2[]"
	| "uvec3[]"
	| "uvec4[]"
	| "vec2[]"
	| "vec3[]"
	| "vec4[]"
	| "mat2[]"
	| "mat3[]"
	| "mat4[]"
	// | "mat2x3[]"
	// | "mat2x4[]"
	// | "mat3x2[]"
	// | "mat3x4[]"
	// | "mat4x2[]"
	// | "mat4x3[]"
	| "sampler2D[]"
	| "sampler3D[]"
	| "samplerCube[]";

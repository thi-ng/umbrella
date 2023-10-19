import { identity } from "@thi.ng/api/fn";
import { mat22n, mat33n, mat44n } from "@thi.ng/matrices/matn";
import { mat22v, mat33v, mat44v } from "@thi.ng/matrices/matv";
import { ZERO3, ZERO4 } from "@thi.ng/vectors/api";
import { fromBVec2, fromBVec3, fromBVec4 } from "@thi.ng/vectors/convert";
import { setVN3, setVN4 } from "@thi.ng/vectors/setvn";
import { setVV4 } from "@thi.ng/vectors/setvv";
import {
	setSwizzle2,
	setSwizzle3,
	setSwizzle4,
	swizzle2,
	swizzle3,
	swizzle4,
} from "@thi.ng/vectors/swizzle";
import type { JSBuiltinsSampler, JSEnv } from "./api.js";
import { BVEC2, BVEC3, BVEC4 } from "./env/bvec.js";
import { FLOAT } from "./env/float.js";
import { INT } from "./env/int.js";
import { IVEC2 } from "./env/ivec2.js";
import { IVEC3 } from "./env/ivec3.js";
import { IVEC4 } from "./env/ivec4.js";
import { MAT2 } from "./env/mat2.js";
import { MAT3 } from "./env/mat3.js";
import { MAT4 } from "./env/mat4.js";
import { UINT } from "./env/uint.js";
import { UVEC2 } from "./env/uvec2.js";
import { UVEC3 } from "./env/uvec3.js";
import { UVEC4 } from "./env/uvec4.js";
import { VEC2 } from "./env/vec2.js";
import { VEC3 } from "./env/vec3.js";
import { VEC4 } from "./env/vec4.js";
import {
	POOL_IVEC2,
	POOL_IVEC3,
	POOL_IVEC4,
	POOL_UVEC2,
	POOL_UVEC3,
	POOL_UVEC4,
	POOL_VEC2,
	POOL_VEC3,
	POOL_VEC4,
} from "./pool.js";

const { next: $2, uniform: $n2 } = POOL_VEC2;
const { next: $3, uniform: $n3 } = POOL_VEC3;
const { next: $4, uniform: $n4 } = POOL_VEC4;

const { next: $i2, uniform: $ni2 } = POOL_IVEC2;
const { next: $i3, uniform: $ni3 } = POOL_IVEC3;
const { next: $i4, uniform: $ni4 } = POOL_IVEC4;

const { next: $u2, uniform: $nu2 } = POOL_UVEC2;
const { next: $u3, uniform: $nu3 } = POOL_UVEC3;
const { next: $u4, uniform: $nu4 } = POOL_UVEC4;

// TODO texture lookups
// all texture fns currently return [0,0,0,0] or 0
const SAMPLER_TODO: JSBuiltinsSampler = {
	texelFetch: () => ZERO4,
	texelFetchOffset: () => ZERO4,
	texture: () => ZERO4,
	texturen: () => 0,
	textureGrad: () => ZERO4,
	textureGradn: () => 0,
	textureLod: () => ZERO4,
	textureLodn: () => 0,
	textureOffset: () => ZERO4,
	textureOffsetn: () => 0,
	textureProj: () => ZERO4,
	textureProjn: () => 0,
	textureSize: () => ZERO3,
};

export const JS_DEFAULT_ENV: JSEnv = {
	vec2: VEC2(POOL_VEC2),
	vec2b: (v) => fromBVec2($2(), v),
	vec2i: identity,
	vec2n: $n2,
	vec2u: identity,

	vec3: VEC3(POOL_VEC3),
	vec3b: (v) => fromBVec3($3(), v),
	vec3i: identity,
	vec3n: $n3,
	vec3u: identity,
	vec3vn: (a, n) => setVN3($3(), a, n),

	vec4: VEC4(POOL_VEC4),
	vec4b: (v) => fromBVec4($4(), v),
	vec4i: identity,
	vec4n: $n4,
	vec4u: identity,
	vec4vn: (a, n) => setVN4($4(), a, n),
	vec4vnn: (a, z, w) => setVV4($4(), a, [z, w]),
	vec4vv: (a, b) => setVV4($4(), a, b),

	mat2n: (n) => mat22n($4(), n),
	mat2vv: (a, b) => mat22v($4(), a, b),
	mat3n: (n) => mat33n([], n),
	mat3vvv: (a, b, c) => mat33v([], a, b, c),
	mat4n: (n) => mat44n([], n),
	mat4vvvv: (a, b, c, d) => mat44v([], a, b, c, d),

	swizzle2: (a, b, c) => swizzle2($2(), a, b, c),
	swizzle3: (a, b, c, d) => swizzle3($3(), a, b, c, d),
	swizzle4: (a, b, c, d, e) => swizzle4($4(), a, b, c, d, e),
	set_swizzle2: setSwizzle2,
	set_swizzle3: setSwizzle3,
	set_swizzle4: setSwizzle4,

	float: FLOAT,
	int: INT,
	uint: UINT,

	bvec2: BVEC2,
	bvec2n: (n) => ((n = !!n), [n, n]),
	bvec3: BVEC3,
	bvec3n: (n) => ((n = !!n), [n, n, n]),
	bvec4: BVEC4,
	bvec4n: (n) => ((n = !!n), [n, n, n, n]),

	ivec2: IVEC2,
	ivec2b: (v) => fromBVec2($i2(), v),
	ivec2n: $ni2,

	ivec3: IVEC3,
	ivec3b: (v) => fromBVec3($i3(), v),
	ivec3n: $ni3,

	ivec4: IVEC4,
	ivec4b: (v) => fromBVec4($i4(), v),
	ivec4n: $ni4,

	uvec2: UVEC2,
	uvec2b: (v) => fromBVec2($u2(), v),
	uvec2n: $nu2,

	uvec3: UVEC3,
	uvec3b: (v) => fromBVec3($u3(), v),
	uvec3n: $nu3,

	uvec4: UVEC4,
	uvec4b: (v) => fromBVec4($u4(), v),
	uvec4n: $nu4,

	mat2: MAT2,
	mat3: MAT3,
	mat4: MAT4,
	sampler1D: SAMPLER_TODO,
	sampler2D: SAMPLER_TODO,
	sampler3D: SAMPLER_TODO,
	samplerCube: SAMPLER_TODO,
	sampler2DShadow: SAMPLER_TODO,
	samplerCubeShadow: SAMPLER_TODO,

	pools: {
		vec2: POOL_VEC2,
		vec3: POOL_VEC3,
		vec4: POOL_VEC4,
		ivec2: POOL_IVEC2,
		ivec3: POOL_IVEC3,
		ivec4: POOL_IVEC4,
		uvec2: POOL_UVEC2,
		uvec3: POOL_UVEC3,
		uvec4: POOL_UVEC4,
	},
};

import type {
	ArrayLikeIterable,
	Fn,
	Fn0,
	Fn2,
	Fn3,
	Fn4,
	Fn6,
	Fn7,
	FnU2,
	ICopy,
	IEmpty,
	IEqualsDelta,
	ILength,
	NumericArray,
	Tuple,
	TypedArray,
} from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";

export interface Vec extends Iterable<number>, ILength {
	[id: number]: number;
}

export interface BVec extends Iterable<boolean>, ILength {
	[id: number]: boolean;
}

export type ReadonlyVec = ArrayLikeIterable<number>;
export type ReadonlyBVec = ArrayLikeIterable<boolean>;

export type Vec2Like = Tuple<number, 2> | TypedArray;
export type Vec3Like = Tuple<number, 3> | TypedArray;
export type Vec4Like = Tuple<number, 4> | TypedArray;
export type BVec2Like = Tuple<boolean, 2>;
export type BVec3Like = Tuple<boolean, 3>;
export type BVec4Like = Tuple<boolean, 4>;

export interface StridedVec {
	buf: NumericArray;
	offset: number;
	stride: number;
}

export interface IVector<T>
	extends Vec,
		ICopy<T>,
		ICopyView<T>,
		IEmpty<T>,
		IEqualsDelta<T>,
		StridedVec {}

export interface ICopyView<T> {
	copyView(): T;
}

export interface VectorConstructor<T> {
	new (buf: NumericArray, offset?: number, stride?: number): T;
}

export interface MultiVecOp<VOP> {
	/**
	 * Adds / overwrites implementation for given vector size.
	 *
	 * @param dim -
	 * @param op -
	 */
	add(dim: number, op: VOP): VOP;
	/**
	 * Adds / overwrites default implementation (SHOULD support
	 * arbitrary vector sizes).
	 *
	 * @param op -
	 */
	default(op: VOP): VOP;
	/**
	 * Returns implementation for given vector size or default
	 * implementation.
	 *
	 * @param dim -
	 */
	impl(dim: number): VOP;
}

export type VecPair = [Vec, Vec];

export type VecOpV = Fn2<Vec | null, ReadonlyVec, Vec>;
export type VecOpN = Fn2<Vec | null, number, Vec>;
export type VecOpVV = Fn3<Vec | null, ReadonlyVec, ReadonlyVec, Vec>;
export type VecOpVN = Fn3<Vec | null, ReadonlyVec, number, Vec>;
export type VecOpVVV = Fn4<
	Vec | null,
	ReadonlyVec,
	ReadonlyVec,
	ReadonlyVec,
	Vec
>;
export type VecOpVVN = Fn4<Vec | null, ReadonlyVec, ReadonlyVec, number, Vec>;
export type VecOpVNV = Fn4<Vec | null, ReadonlyVec, number, ReadonlyVec, Vec>;
export type VecOpVNN = Fn4<Vec | null, ReadonlyVec, number, number, Vec>;
export type VecOpVVVVV = Fn6<
	Vec | null,
	ReadonlyVec,
	ReadonlyVec,
	ReadonlyVec,
	ReadonlyVec,
	ReadonlyVec,
	Vec
>;
export type VecOpVVVVNN = Fn7<
	Vec | null,
	ReadonlyVec,
	ReadonlyVec,
	ReadonlyVec,
	ReadonlyVec,
	number,
	number,
	Vec
>;

export type VecOpVO<T> = (out: Vec | null, a: ReadonlyVec, b?: T) => Vec;
export type VecOpOO<A, B> = (out: Vec | null, a?: A, b?: B) => Vec;
export type VecOpOOO<A, B, C> = (out: Vec | null, a?: A, b?: B, c?: C) => Vec;
export type VecOpNNO<T> = (out: Vec | null, a: number, b: number, c?: T) => Vec;

export type VecOpRoV<T> = Fn<ReadonlyVec, T>;
export type VecOpRoVV<T> = FnU2<ReadonlyVec, T>;
export type VecOpRoVVO<T, O> = (a: ReadonlyVec, b: ReadonlyVec, c?: O) => T;

export type VecOpFN = (out: Vec | null, fn: Fn0<number>, n?: number) => Vec;

export type VecOpFNO = (out: Vec | null, fn?: Fn0<number>, n?: number) => Vec;
export type VecOpNFO = (out: Vec | null, n?: number, fn?: Fn0<number>) => Vec;

export type VecOpSV = (
	out: Vec | null,
	a: ReadonlyVec,
	io?: number,
	ia?: number,
	so?: number,
	sa?: number
) => Vec;
export type VecOpSGV = (
	out: Vec | null,
	a: ReadonlyVec,
	num: number,
	io?: number,
	ia?: number,
	so?: number,
	sa?: number
) => Vec;

export type VecOpSN = (
	out: Vec | null,
	n: number,
	io?: number,
	so?: number
) => Vec;
export type VecOpSGN = (
	out: Vec | null,
	n: number,
	num: number,
	io?: number,
	so?: number
) => Vec;

export type VecOpSVN = (
	out: Vec | null,
	a: ReadonlyVec,
	n: number,
	io?: number,
	ia?: number,
	so?: number,
	sa?: number
) => Vec;
export type VecOpSGVN = (
	out: Vec | null,
	a: ReadonlyVec,
	n: number,
	num: number,
	io?: number,
	ia?: number,
	so?: number,
	sa?: number
) => Vec;

export type VecOpSVV = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;
export type VecOpSGVV = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	num: number,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;

export type VecOpSVNV = (
	out: Vec | null,
	a: ReadonlyVec,
	n: number,
	b: ReadonlyVec,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;
export type VecOpSGVNV = (
	out: Vec | null,
	a: ReadonlyVec,
	n: number,
	b: ReadonlyVec,
	num: number,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;

export type VecOpSVVN = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	n: number,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;
export type VecOpSGVVN = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	n: number,
	num: number,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;

export type VecOpSVVV = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	io?: number,
	ia?: number,
	ib?: number,
	ic?: number,
	so?: number,
	sa?: number,
	sb?: number,
	sc?: number
) => Vec;
export type VecOpSGVVV = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	num: number,
	io?: number,
	ia?: number,
	ib?: number,
	ic?: number,
	so?: number,
	sa?: number,
	sb?: number,
	sc?: number
) => Vec;

export type VecOpSRoV<T> = (a: ReadonlyVec, ia?: number, sa?: number) => T;
export type VecOpSGRoV<T> = (
	a: ReadonlyVec,
	num: number,
	ia?: number,
	sa?: number
) => T;

export type VecOpSRoVV<T> = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	ia?: number,
	ib?: number,
	sa?: number,
	sb?: number
) => T;

export type VecOpSVO<T> = (
	out: Vec | null,
	a: ReadonlyVec,
	b?: T,
	io?: number,
	ia?: number,
	so?: number,
	sa?: number
) => Vec;
export type VecOpSGVO<T> = (
	out: Vec | null,
	a: ReadonlyVec,
	num: number,
	b?: T,
	io?: number,
	ia?: number,
	so?: number,
	sa?: number
) => Vec;

export type VecOpSOO<A, B> = (
	a: Vec | null,
	opt1?: A,
	opt2?: B,
	ia?: number,
	sa?: number
) => Vec;
export type VecOpSGOO<A, B> = (
	a: Vec | null,
	num: number,
	opt1?: A,
	opt2?: B,
	ia?: number,
	sa?: number
) => Vec;

export type VecOpSOOO<A, B, C> = (
	a: Vec | null,
	opt1?: A,
	opt2?: B,
	opt3?: C,
	ia?: number,
	sa?: number
) => Vec;
export type VecOpSGOOO<A, B, C> = (
	a: Vec | null,
	num: number,
	opt1?: A,
	opt2?: B,
	opt3?: C,
	ia?: number,
	sa?: number
) => Vec;

export type VecOpSVVO<O> = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	opt?: O,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;
export type VecOpSGVVO<O> = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	num: number,
	opt?: O,
	io?: number,
	ia?: number,
	ib?: number,
	so?: number,
	sa?: number,
	sb?: number
) => Vec;

export type VecOpSGFN = (
	out: Vec | null,
	num: number,
	fn: Fn0<number>,
	n?: number,
	io?: number,
	so?: number
) => Vec;
export type VecOpSFN = (
	out: Vec | null,
	fn: Fn0<number>,
	n?: number,
	io?: number,
	so?: number
) => Vec;

export type MultiVecOpImpl<T> = T & MultiVecOp<T>;

export type MultiVecOpV = MultiVecOpImpl<VecOpV>;
export type MultiVecOpN = MultiVecOpImpl<VecOpN>;
export type MultiVecOpVV = MultiVecOpImpl<VecOpVV>;
export type MultiVecOpVN = MultiVecOpImpl<VecOpVN>;
export type MultiVecOpVVV = MultiVecOpImpl<VecOpVVV>;
export type MultiVecOpVVN = MultiVecOpImpl<VecOpVVN>;
export type MultiVecOpVNV = MultiVecOpImpl<VecOpVNV>;
export type MultiVecOpVNN = MultiVecOpImpl<VecOpVNN>;
export type MultiVecOpVVVVV = MultiVecOpImpl<VecOpVVVVV>;
export type MultiVecOpVVVVNN = MultiVecOpImpl<VecOpVVVVNN>;

export type MultiVecOpVO<T> = MultiVecOpImpl<VecOpVO<T>>;
export type MultiVecOpOO<A, B> = MultiVecOpImpl<VecOpOO<A, B>>;
export type MultiVecOpOOO<A, B, C> = MultiVecOpImpl<VecOpOOO<A, B, C>>;
export type MultiVecOpNNO<T> = MultiVecOpImpl<VecOpNNO<T>>;

export type MultiVecOpRoV<T> = MultiVecOpImpl<VecOpRoV<T>>;
export type MultiVecOpRoVV<T> = MultiVecOpImpl<VecOpRoVV<T>>;
export type MultiVecOpRoVVO<T, O> = MultiVecOpImpl<VecOpRoVVO<T, O>>;

export type MultiVecOpFN = MultiVecOpImpl<VecOpFN>;
export type MultiVecOpFNO = MultiVecOpImpl<VecOpFNO>;
export type MultiVecOpNFO = MultiVecOpImpl<VecOpNFO>;
export type MultiVecOpSFN = MultiVecOpImpl<VecOpSFN>;

export type BVecOpRoV<T> = Fn<ReadonlyBVec, T>;
export type BVecOpV = Fn2<BVec | null, ReadonlyBVec, BVec>;
export type BVecOpVV = Fn3<BVec | null, ReadonlyBVec, ReadonlyBVec, BVec>;
export type BVecOpVN = Fn3<BVec | null, ReadonlyBVec, boolean, BVec>;

export type ToBVecOpV = Fn2<BVec | null, ReadonlyVec, BVec>;
export type FromBVecOpV = Fn2<Vec | null, ReadonlyBVec, Vec>;

export type MultiBVecOpV = MultiVecOpImpl<BVecOpV>;
export type MultiBVecOpVV = MultiVecOpImpl<BVecOpVV>;
export type MultiBVecOpVN = MultiVecOpImpl<BVecOpVN>;
export type MultiBVecOpRoV<T> = MultiVecOpImpl<BVecOpRoV<T>>;

export type MultiToBVecOpV = MultiVecOpImpl<ToBVecOpV>;
export type MultiFromBVecOpV = MultiVecOpImpl<FromBVecOpV>;

export type CompareOp = Fn3<BVec | null, ReadonlyVec, ReadonlyVec, BVec>;
export type MultiCompareOp = MultiVecOpImpl<CompareOp>;

export type DistanceFn = VecOpRoVV<number>;

/**
 * An object of the ~70 most common vector operations implemented for a specific
 * vector size. See {@link VEC2}, {@link VEC3}, {@link VEC4}.
 *
 * @remarks
 * Using this interface simplifies other performance-critical use
 * cases/algorithms which target different dimensionalities (e.g. 2d/3d), but
 * which should use the size-optimized vector operations (avoiding the small
 * overhead of their nD vector versions which would likely be used otherwise).
 *
 * @example
 * ```ts
 * interface Particle {
 *   pos: Vec;
 *   dir: Vec;
 *   targetDir: Vec;
 *   speed: number;
 *   turnSpeed: number;
 * }
 *
 * const updateParticle = (p: Particle, api: VecAPI) => {
 *   // interpolate current direction toward target dir
 *   api.mixN(null, p.dir, p.targetDir, p.turnSpeed);
 *   // normalize direction
 *   api.normalize(null, p.dir);
 *   // add scaled direction to position (and store as new position)
 *   return api.maddN(p.pos, p.dir, p.speed, p.pos);
 * };
 *
 * // 2d version
 *
 * let p2d: Particle = {
 *   pos: [10,20], dir: [0,1], targetDir: [1,0], speed: 5, turnSpeed: 0.1
 * };
 *
 * updateParticle(p2d, VEC2);
 * // [ 10.552, 24.969 ]
 *
 * // 3d version
 *
 * let p3d: Particle = {
 *   pos: [10,20,30], dir: [0,1,0], targetDir: [0,0,1], speed: 5, turnSpeed: 0.1
 * };
 *
 * updateParticle(p3d, VEC3);
 * // [ 10, 24.969, 30.552 ]
 * ```
 */
export interface VecAPI {
	abs: VecOpV;
	acos: VecOpV;
	add: VecOpVV;
	addN: VecOpVN;
	addm: VecOpVVV;
	addmN: VecOpVVN;
	asin: VecOpV;
	atan: VecOpV;
	atan2: VecOpVV;
	ceil: VecOpV;
	clamp: VecOpVVV;
	clamp01: VecOpV;
	cos: VecOpV;
	degrees: VecOpV;
	dist: DistanceFn;
	distSq: DistanceFn;
	div: VecOpVV;
	divN: VecOpVN;
	dot: VecOpRoVV<number>;
	eqDelta: VecOpRoVVO<boolean, number>;
	equals: VecOpRoVV<boolean>;
	exp: VecOpV;
	exp2: VecOpV;
	fit: VecOpVVVVV;
	fit01: VecOpVVV;
	floor: VecOpV;
	fmod: VecOpVV;
	fract: VecOpV;
	invSqrt: VecOpV;
	mag: VecOpRoV<number>;
	magSq: VecOpRoV<number>;
	limit: VecOpVN;
	log: VecOpV;
	log2: VecOpV;
	madd: VecOpVVV;
	maddN: VecOpVNV;
	major: VecOpRoV<number>;
	max: VecOpVV;
	min: VecOpVV;
	minor: VecOpRoV<number>;
	mix: VecOpVVV;
	mixN: VecOpVVN;
	mod: VecOpVV;
	modN: VecOpVN;
	msub: VecOpVVV;
	msubN: VecOpVNV;
	mul: VecOpVV;
	mulN: VecOpVN;
	normalize: VecOpV;
	pow: VecOpVV;
	powN: VecOpVN;
	radians: VecOpV;
	random: VecOpOOO<number, number, IRandom>;
	randomDistrib: VecOpFNO;
	randMinMax: VecOpOOO<ReadonlyVec, ReadonlyVec, IRandom>;
	randNorm: (v: Vec | null, n?: number, rnd?: IRandom) => Vec;
	randNormDistrib: VecOpNFO;
	round: VecOpVV;
	set: VecOpV;
	setN: VecOpN;
	sign: VecOpV;
	sin: VecOpV;
	smoothstep: VecOpVVV;
	sqrt: VecOpV;
	step: VecOpVV;
	sub: VecOpVV;
	subN: VecOpVN;
	subm: VecOpVVV;
	submN: VecOpVVN;
	tan: VecOpV;
	trunc: VecOpV;

	eq: CompareOp;
	neq: CompareOp;
	gt: CompareOp;
	gte: CompareOp;
	lt: CompareOp;
	lte: CompareOp;
}

export type Template = (syms: string[], i?: number) => string;

export interface ToStringOpts {
	/**
	 * Number of fractional digits
	 *
	 * @defaultValue 3
	 */
	prec: number;
	/**
	 * If given, each formatted vector component will be padded to given number
	 * of characters.
	 */
	width: number;
	/**
	 * Inter-component delimiter.
	 *
	 * @defaultValue ", "
	 */
	delim: string;
	/**
	 * Prefix/suffix wrapper strings.
	 *
	 * @defaultValue "[" and "]"
	 */
	wrap: ArrayLike<string>;
}

const mi = -Infinity;
const mx = Infinity;

export const MIN2: ReadonlyVec = Object.freeze([mi, mi]);
export const MAX2: ReadonlyVec = Object.freeze([mx, mx]);
export const ONE2: ReadonlyVec = Object.freeze([1, 1]);
export const ZERO2: ReadonlyVec = Object.freeze([0, 0]);
export const X2: ReadonlyVec = Object.freeze([1, 0]);
export const Y2: ReadonlyVec = Object.freeze([0, 1]);

export const MIN3: ReadonlyVec = Object.freeze([mi, mi, mi]);
export const MAX3: ReadonlyVec = Object.freeze([mx, mx, mx]);
export const ONE3: ReadonlyVec = Object.freeze([1, 1, 1]);
export const ZERO3: ReadonlyVec = Object.freeze([0, 0, 0]);
export const X3: ReadonlyVec = Object.freeze([1, 0, 0]);
export const Y3: ReadonlyVec = Object.freeze([0, 1, 0]);
export const Z3: ReadonlyVec = Object.freeze([0, 0, 1]);

export const MIN4: ReadonlyVec = Object.freeze([mi, mi, mi, mi]);
export const MAX4: ReadonlyVec = Object.freeze([mx, mx, mx, mx]);
export const ONE4: ReadonlyVec = Object.freeze([1, 1, 1, 1]);
export const ZERO4: ReadonlyVec = Object.freeze([0, 0, 0, 0]);
export const X4: ReadonlyVec = Object.freeze([1, 0, 0, 0]);
export const Y4: ReadonlyVec = Object.freeze([0, 1, 0, 0]);
export const Z4: ReadonlyVec = Object.freeze([0, 0, 1, 0]);
export const W4: ReadonlyVec = Object.freeze([0, 0, 0, 1]);

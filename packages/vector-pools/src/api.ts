import type {
	GLType,
	IObjectOf,
	IRelease,
	Maybe,
	NumericArray,
	Type,
	TypedArray,
} from "@thi.ng/api";
import { ROOT } from "@thi.ng/logger/root";
import type { MemPool, MemPoolOpts } from "@thi.ng/malloc";
import type { ReadonlyVec, StridedVec } from "@thi.ng/vectors";

export interface AttribSpec {
	type: GLType | Type;
	size: number;
	byteOffset: number;
	stride?: number;
	default?: number | ReadonlyVec;
	data?: ReadonlyVec | ReadonlyVec[];
	index?: number;
}

export interface AttribPoolOpts {
	mem: MemPool | Partial<MemPoolOpts>;
	attribs?: IObjectOf<AttribSpec>;
	num: number;
	resizable?: boolean;
}

export interface IVecPool extends IRelease {
	malloc(size: number, type?: GLType | Type): Maybe<TypedArray>;

	mallocWrapped(
		size: number,
		stride?: number,
		type?: GLType | Type
	): Maybe<StridedVec>;

	mallocArray(
		num: number,
		size: number,
		cstride?: number,
		estride?: number,
		type?: GLType | Type
	): Maybe<StridedVec[]>;

	free(vec: StridedVec | TypedArray): boolean;

	freeAll(): void;
}

export type VecFactory = (
	buf: NumericArray,
	size: number,
	index: number,
	stride: number
) => StridedVec;

/**
 * See [thi.ng/logger](https://docs.thi.ng/umbrella/logger/) for usage.
 */
export const LOGGER = ROOT.childLogger("vecpool");

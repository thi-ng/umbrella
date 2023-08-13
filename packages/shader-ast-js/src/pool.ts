import {
	typedArray,
	type IReset,
	type Type,
	type TypedArray,
} from "@thi.ng/api";
import { outOfBounds } from "@thi.ng/errors/out-of-bounds";
import type { Vec } from "@thi.ng/vectors";
import { set } from "@thi.ng/vectors/set";
import { setC2, setC3, setC4 } from "@thi.ng/vectors/setc";

/**
 * Manager for re-using pre-allocated memory for various vector ops. If the
 * compiled shader program includes a `main()` function, the pools will be reset
 * automatically when that `main` function executes. Otherwise, users **MUST**
 * call the {@link CompileResult.__reset} manually each time before invoking a
 * compiled entry point function.
 *
 * @remarks
 * Currently, the default capacity for each vector type is fixed at 2048 items.
 * That means a shader program can create up to this number of temporary objects
 * (per fragment/invocation). Should this number be insufficient, please submit
 * an issue and explain your use case. Thanks!
 */
export class Pool implements IReset {
	mem: TypedArray;
	items: Vec[];
	index = 0;

	constructor(type: Type, protected size: number, protected cap: number) {
		this.mem = typedArray(type, cap * size);
		this.items = new Array<TypedArray>(cap);
		for (let i = 0; i < cap; i++) {
			this.items[i] = this.mem.subarray(i * size, i * size + size);
		}
	}

	reset() {
		this.index = 0;
		return this;
	}

	next() {
		if (this.index > this.items.length) outOfBounds(this.index);
		return this.items[this.index++];
	}

	builder(): (...args: number[]) => Vec {
		switch (this.size) {
			case 2:
				return (x, y) => setC2(this.next(), x, y);
			case 3:
				return (x, y, z) => setC3(this.next(), x, y, z);
			case 4:
				return (x, y, z, w) => setC4(this.next(), x, y, z, w);
			default:
				return (...args: number[]) => set(this.next(), args);
		}
	}
}

const CAP = 2048;

export const POOL_VEC2 = new Pool("f32", 2, CAP);
export const POOL_VEC3 = new Pool("f32", 3, CAP);
export const POOL_VEC4 = new Pool("f32", 4, CAP);

export const POOL_IVEC2 = new Pool("i32", 2, CAP);
export const POOL_IVEC3 = new Pool("i32", 3, CAP);
export const POOL_IVEC4 = new Pool("i32", 4, CAP);

export const POOL_UVEC2 = new Pool("u32", 2, CAP);
export const POOL_UVEC3 = new Pool("u32", 3, CAP);
export const POOL_UVEC4 = new Pool("u32", 4, CAP);

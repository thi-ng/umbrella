import type { Tensor, ITensorStorage } from "./api.js";

export class JSArrayStorage<T = number> implements ITensorStorage<T> {
	alloc(size: number): Tensor<T> {
		return new Array<T>(size);
	}

	release() {
		return true;
	}
}

export class TypedArrayStorage implements ITensorStorage<number> {
	alloc(size: number): Tensor<number> {
		return new Float64Array(size);
	}

	release() {
		return true;
	}
}

export let DEFAULT_STORAGE = new JSArrayStorage();

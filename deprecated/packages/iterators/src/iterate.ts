import type { Fn } from "@thi.ng/api";

export function* iterate<T>(fn: Fn<T, T>, seed: T) {
	while (true) {
		yield seed;
		seed = fn(seed);
	}
}

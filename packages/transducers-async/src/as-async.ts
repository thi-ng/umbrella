import { wait } from "./delayed.js";

export async function* asAsyncIterable<T>(src: Iterable<T>, delay = 0) {
	for (let x of src) {
		yield x;
		if (delay > 0) await wait(delay);
	}
}

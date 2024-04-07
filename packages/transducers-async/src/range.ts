import { delayed } from "@thi.ng/compose/delayed";
import { Range } from "@thi.ng/transducers/range";

/**
 * Async version of [thi.ng/transducers
 * range()](https://docs.thi.ng/umbrella/transducers/functions/range-1.html),
 * taking an additional `delay` argument for specifying the number of
 * milliseconds between each generated value.
 *
 * @param delay
 */
export function range(delay: number): AsyncIterableIterator<number>;
export function range(to: number, delay: number): AsyncIterableIterator<number>;
export function range(
	from: number,
	to: number,
	delay: number
): AsyncIterableIterator<number>;
export function range(
	from: number,
	to: number,
	step: number,
	delay: number
): AsyncIterableIterator<number>;
export async function* range(...args: number[]) {
	const delay = args.pop()!;
	for (let x of new Range(...(<[number]>args))) {
		yield x;
		await delayed(null, delay);
	}
}

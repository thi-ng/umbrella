export function range(): IterableIterator<number>;
export function range(to: number): IterableIterator<number>;
export function range(from: number, to: number): IterableIterator<number>;
export function range(
	from: number,
	to: number,
	step: number
): IterableIterator<number>;
export function* range(from?: number, to?: number, step?: number) {
	if (from === undefined) {
		from = 0;
		to = Infinity;
	} else if (to === undefined) {
		to = from;
		from = 0;
	}
	step = step === undefined ? (from < to ? 1 : -1) : step;
	if (step > 0) {
		while (from < to) {
			yield from;
			from += step;
		}
	} else if (step < 0) {
		while (from > to) {
			yield from;
			from += step;
		}
	}
}

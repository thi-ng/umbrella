export interface SidechainOpts {
	/**
	 * If true (default), only emits the last received value when the sidechain
	 * delivers a truthy value. Otherwise buffers and emits *all* received
	 * values since the last time the sidechain triggered.
	 *
	 * @defaultValue true
	 */
	lastOnly: boolean;
}

export function sidechain<T>(
	src: AsyncIterable<T>,
	side: AsyncIterable<any>,
	opts: Partial<SidechainOpts> & { lastOnly: false }
): AsyncIterableIterator<T[]>;
export function sidechain<T>(
	src: AsyncIterable<T>,
	side: AsyncIterable<any>,
	opts?: Partial<SidechainOpts>
): AsyncIterableIterator<T>;
export async function* sidechain<T>(
	src: AsyncIterable<T>,
	side: AsyncIterable<any>,
	opts?: Partial<SidechainOpts>
) {
	const { lastOnly = true } = opts || {};
	const $iter = src[Symbol.asyncIterator]();
	const $side = side[Symbol.asyncIterator]();
	const promises: Promise<[IteratorResult<any>, boolean?]>[] = [
		$iter.next().then((res) => [res]),
		$side.next().then((res) => [res, true]),
	];
	let buf: T[] = [];
	while (true) {
		const [res, side] = await Promise.race(promises);
		if (res.done) return;
		if (side) {
			promises[1] = $side.next().then((res) => [res, true]);
			if (!buf.length) continue;
			if (lastOnly) {
				yield buf[0];
				buf.length = 0;
			} else {
				yield buf;
				buf = [];
			}
		} else {
			promises[0] = $iter.next().then((res) => [res]);
			if (lastOnly) buf[0] = res.value;
			else buf.push(res.value);
		}
	}
}

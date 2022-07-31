import { CloseMode, CommonOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { stream } from "./stream.js";

export interface FromIntervalOpts extends CommonOpts {
	/**
	 * If given, only the stated number of values will be emitted (in
	 * the `[0...num)` interval) and the stream will become inactive (or
	 * close) after.
	 *
	 * @defaultValue Infinity
	 */
	num: number;
}

/**
 * Returns a {@link Stream} of monotonically increasing counter values,
 * emitted at given `delay` interval and up to the optionally defined
 * max value (default: ∞), after which the stream is closed.
 *
 * @remarks
 * The stream only starts when the first subscriber becomes available.
 *
 * @param delay -
 * @param opts -
 */
export const fromInterval = (
	delay: number,
	opts?: Partial<FromIntervalOpts>
) => {
	opts = __optsWithID("interval", <FromIntervalOpts>{
		num: Infinity,
		...opts,
	});
	return stream<number>((stream) => {
		let i = 0;
		let count = opts!.num!;
		stream.next(i++);
		let id = setInterval(() => {
			stream.next(i++);
			if (--count <= 0) {
				clearInterval(id);
				stream.closeIn !== CloseMode.NEVER && stream.done();
			}
		}, delay);
		return () => clearInterval(id);
	}, opts);
};

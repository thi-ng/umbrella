import type { ArrayLikeIterable, Fn, Fn3, IObjectOf } from "@thi.ng/api";
import { assocObj } from "@thi.ng/transducers/assoc-obj";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { range } from "@thi.ng/transducers/range";
import { transduce } from "@thi.ng/transducers/transduce";
import type {
	CommonOpts,
	ISubscribable,
	ITransformable,
	WorkerSource,
} from "./api.js";
import type { Subscription } from "./subscription.js";
import { sync } from "./sync.js";
import { tunnel } from "./tunnel.js";

export interface ForkJoinOpts<IN, MSG, RES, OUT> extends Partial<CommonOpts> {
	/**
	 * Input stream to attach to obtain work items from.
	 */
	src: ITransformable<IN>;
	/**
	 * Transformation function prepare (e.g. chunk) work for a single
	 * worker. Receives worker `id` [0 .. numWorkers), `numWorkers` and
	 * current input value to be processed. Only the results of this
	 * function are sent to the worker and therefore the function must
	 * return a type compatible with the configured worker instance.
	 *
	 * For example, such a function might extract slices from a large
	 * input array, one per worker. The given worker ID and worker count
	 * can be used to create non-overlapping chunks to evenly spread the
	 * workload...
	 *
	 * Also see: {@link forkBuffer}
	 */
	fork: Fn3<number, number, IN, MSG>;
	/**
	 * Join function. Receives array of worker results (in worker ID
	 * order) and is responsible to transform these into the final
	 * result / output type.
	 */
	join: Fn<RES[], OUT>;
	/**
	 * Optional function to extract transferables from `fork` result
	 * values (i.e. payloads sent to each worker), e.g. ArrayBuffers. See:
	 * https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage
	 */
	transferables?: Fn<MSG, any[]>;
	/**
	 * An existing `Worker` instance, a JS source code `Blob` or an URL
	 * string. In the latter two cases, a worker is created
	 * automatically using `makeWorker()`.
	 */
	worker: WorkerSource;
	/**
	 * Optional max number of workers to use. Defaults to
	 * `navigator.hardwareConcurrency` (or if unavailable, then 4 as
	 * fallback). If setting this higher, be aware of browser limits and
	 * potential resulting crashes!
	 *
	 * If using multiple `forkJoin`s concurrently, it's the user's
	 * responsibility to ensure that the total number of workers won't
	 * exceed the browser limit (Chome/FF ~20).
	 */
	numWorkers?: number;
	/**
	 * If true, the workers will be terminated and restarted for each
	 * new input stream value. This is useful to avoid executing
	 * extraneous work and ensures only the most rececent stream value
	 * is being processed.
	 *
	 * IMPORTANT: Please note that `forkJoin` does NOT handle
	 * backpressure at all. If `interrupt` is false, it's the user's
	 * responsibility to ensure that the input stream does NOT operate
	 * on a higher frequency than workers can produce results or else
	 * undefined behavior WILL occur!
	 *
	 * Default: false
	 */
	interrupt?: boolean;
	/**
	 * If given and greater than zero, all workers will be terminated
	 * after given period (in millis) after the parent stream is done.
	 * If used, this value MUST be higher than the expected processing
	 * time of the worker jobs, in order to guarantee that the last
	 * values are processed fully.
	 *
	 * Default: 1000
	 */
	terminate?: number;
	/**
	 * If greater than 0, then each labeled input will cache upto the
	 * stated number of input values, even if other inputs have not yet
	 * produced new values. Once the limit is reached, `partitionSync()`
	 * will throw an `IllegalState` error.
	 *
	 * Enabling this option will cause the same behavior as if `reset`
	 * is enabled (regardless of the actual configured `reset` setting).
	 * I.e. new results are only produced when ALL required inputs have
	 * available values...
	 */
	backPressure?: number;
}

/**
 * Returns a {@link StreamSync} instance which creates & attaches
 * multiple subscriptions to given `src` input stream, processes each
 * received value in parallel via web workers, then recombines partial
 * results and passes the resulting transformed value downstream.
 *
 * @remarks
 * See {@link ForkJoinOpts} for further details & behavior options and
 * the {@link forkBuffer} and {@link joinBuffer} helpers for array-based
 * value processing (most likely use case).
 *
 * @param src - input stream
 * @param opts -
 */
export const forkJoin = <IN, MSG, RES, OUT>(
	opts: ForkJoinOpts<IN, MSG, RES, OUT>
): Subscription<any, OUT> => {
	const numWorkers = opts.numWorkers || navigator.hardwareConcurrency || 4;
	const workerIDs = range(numWorkers);
	return sync({
		src: transduce<
			number,
			[string, ISubscribable<RES>],
			IObjectOf<ISubscribable<RES>>
		>(
			map((id) => [
				String(id),
				opts.src
					.transform(map((x: IN) => opts.fork(id, numWorkers, x)))
					.subscribe<RES>(
						tunnel({
							src: opts.worker,
							transferables: opts.transferables,
							interrupt: opts.interrupt === true,
							terminate: opts.terminate,
							id: String(id),
						})
					),
			]),
			assocObj(),
			workerIDs
		),
		xform: comp(
			// form result tuple in original order
			map((results) => [...map((id) => results[id], workerIDs)]),
			// apply user join function
			map(opts.join)
		),
		reset: true,
		backPressure: opts.backPressure,
	});
};

export type Sliceable<T> = ArrayLike<T> & {
	slice(a: number, b?: number): Sliceable<T>;
};

/**
 * Higher-order fork function for scenarios involving the split-parallel
 * processing of a large buffer.
 *
 * @remarks
 * The returned function is meant to be used as `fork` function in a
 * {@link ForkJoinOpts} config and extracts a workload slice of the
 * original buffer for a single worker. The HOF itself takes a minimum
 * chunk size as optional parameter (default: 1).
 *
 * **Note:** Depending on the configured `minChunkSize` and the size of
 * the input buffer to be partitioned, the returned fork function might
 * produce empty sub-arrays for some workers, iff the configured number
 * of workers exceeds the resulting number of chunks / input values.
 * E.g. If the number of workers = 8, buffer size = 10 and min chunk
 * size = 2, then the last 3 (i.e. 8 - 10 / 2) workers will only receive
 * empty workloads.
 *
 * More generally, if the input buffer size is not equally distributable
 * over the given number of workers, the last worker(s) might receive a
 * larger, smaller or empty chunk.
 *
 * Also see {@link forkJoin} and {@link joinBuffer}.
 *
 * @example
 * ```ts
 * import { forkBuffer, forkJoin, joinBuffer } from "@thi.ng/rstream";
 *
 * forkJoin<number[], number[], number[], number[]>({
 *     src,
 *     // job definition / split buffer into chunks (min size 256 values)
 *     fork: forkBuffer(256),
 *     // re-join partial results
 *     join: joinBuffer(),
 *     worker: "./worker.js",
 * })
 * ```
 *
 * @param minChunkSize -
 */
export const forkBuffer =
	(minChunkSize = 1) =>
	<T extends Sliceable<any>>(id: number, numWorkers: number, buf: T) => {
		const chunkSize = Math.max(minChunkSize, (buf.length / numWorkers) | 0);
		return id < numWorkers - 1
			? <T>buf.slice(id * chunkSize, (id + 1) * chunkSize)
			: <T>buf.slice(id * chunkSize);
	};

/**
 * Higher-order join function for scenarios involving the split-parallel
 * processing of a large buffer.
 *
 * @remarks
 * The returned function is meant to be used as `join` function in a
 * {@link ForkJoinOpts} config, receives the processed result chunks
 * from all workers (ordered by worker ID) and concatenates them back
 * into a single result array.
 *
 * The optional `fn` arg can be used to pick the actual result chunk
 * from each worker result. This is useful if the worker result type is
 * not an array and includes other data points (e.g. execution metrics
 * etc.). If `fn` is not given, it defaults to the identity function
 * (i.e. each worker's result is assumed to be an array).
 *
 * Also see {@link forkJoin} and {@link forkBuffer}.
 *
 * @param fn -
 */
export const joinBuffer = <A, B>(fn?: Fn<A, ArrayLikeIterable<B>>) =>
	fn
		? (parts: A[]) => <B[]>[...mapcat(fn, parts)]
		: (parts: A[]) => <B[]>Array.prototype.concat.apply([], parts);

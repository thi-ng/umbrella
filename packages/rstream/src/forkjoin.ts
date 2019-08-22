import { Fn, Fn3 } from "@thi.ng/api";
import { comp, map, range } from "@thi.ng/transducers";
import { CommonOpts, ITransformable } from "./api";
import { sync } from "./stream-sync";
import { tunnel } from "./subs/tunnel";
import { Subscription } from "./subscription";

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
     * @see workerSlice()
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
    worker: string | Worker | Blob;
    /**
     * Optional max number of workers to use. Defaults to
     * `navigator.hardwareConcurrency` (or if unavailable, then 4 as
     * fallback). If setting this higher, be aware of browser limits and
     * potential resulting crashes!
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
     *
     * Default: 1000
     */
    terminate?: number;
}

/**
 * Creates a new `StreamSync` instance which uses multiple subscriptions
 * to given input stream `src` and processes each in parallel via web
 * workers.
 *
 * See `ForkJoinOpts` for further details.
 *
 * @param src input stream
 * @param opts
 */
export const forkJoin = <IN, MSG, RES, OUT>(
    opts: ForkJoinOpts<IN, MSG, RES, OUT>
): Subscription<any, OUT> => {
    const numWorkers = opts.numWorkers || navigator.hardwareConcurrency || 4;
    const workerIDs = range(numWorkers);
    return sync<RES, OUT>({
        src: [
            ...map(
                (id) =>
                    opts.src
                        .transform(map((x) => opts.fork(id, numWorkers, x)))
                        .subscribe(
                            tunnel<MSG, RES>({
                                src: opts.worker,
                                transferables: opts.transferables,
                                interrupt: opts.interrupt === true,
                                terminate: opts.terminate,
                                id: String(id)
                            })
                        ),
                workerIDs
            )
        ],
        xform: comp(
            // form result tuple in original order
            map((results) => [...map((id) => results[id], workerIDs)]),
            // apply user join function
            map(opts.join)
        ),
        reset: true
    });
};

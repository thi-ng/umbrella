import { LOGGER, State } from "../api";
import { Subscription } from "../subscription";
import { nextID } from "../utils/idgen";
import { makeWorker } from "../utils/worker";
import type { Fn } from "@thi.ng/api";

export interface TunnelOpts<A> {
    /**
     * Tunnelled worker instance, source blob or script URL.
     * If `interrupt` is enabled, the worker MUST be given as blob or URL.
     */
    src: Worker | Blob | string;
    /**
     * Max. number of worker instances to use. Only useful if
     * `interrupt` is disabled. If more than one worker is used,
     * incoming stream values will be assigned in a round robin manner
     * and result value ordering will be non-deterministic. Workers will
     * be instantiated on demand.
     *
     * Default: 1
     */
    maxWorkers?: number;
    /**
     * Optional subscription ID to use.
     */
    id?: string;
    /**
     * Optional function to extract transferables from incoming stream
     * values, e.g. ArrayBuffers. See:
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage}
     */
    transferables?: Fn<A, any[]>;
    /**
     * If given and greater than zero, all workers will be terminated
     * after given period (in millis) after the parent stream is done.
     *
     * Default: 1000
     */
    terminate?: number;
    /**
     * If true, the worker will be terminated and restarted for each new
     * stream value. This is useful to avoid executing extraneous work
     * and ensures only the most rececent stream value is being processed.
     *
     * Default: false
     */
    interrupt?: boolean;
}

/**
 * Returns a {@link Subscription} which processes received values via
 * the configured worker(s) and then passes values received back from
 * the worker(s) downstream, thereby allowing workers to be used
 * transparently for stream processing.
 *
 * @remarks
 * Multiple worker instances are supported for concurrent processing.
 * See the {@link TunnelOpts} for details.
 *
 * Also see {@link forkJoin} and {@link postWorker}.
 *
 * @param opts -
 */
export const tunnel = <A, B>(opts: TunnelOpts<A>) => new Tunnel<A, B>(opts);

export class Tunnel<A, B> extends Subscription<A, B> {
    workers: Worker[];
    src: Worker | Blob | string;
    transferables?: Fn<A, any[]>;
    terminate: number;
    interrupt: boolean;

    index: number;

    constructor(opts: TunnelOpts<A>) {
        super(undefined, { id: opts.id || `tunnel-${nextID()}` });
        this.src = opts.src;
        this.workers = new Array(opts.maxWorkers || 1);
        this.transferables = opts.transferables;
        this.terminate = opts.terminate || 1000;
        this.interrupt = opts.interrupt || false;
        this.index = 0;
    }

    next(x: A) {
        if (this.state < State.DONE) {
            let tx;
            if (this.transferables) {
                tx = this.transferables(x);
            }
            let worker: Worker | null = this.workers[this.index];
            if (this.interrupt && worker) {
                worker.terminate();
                worker = null;
            }
            if (!worker) {
                this.workers[this.index++] = worker = makeWorker(this.src);
                this.index %= this.workers.length;
                worker.addEventListener("message", (e: MessageEvent) =>
                    this.dispatch(e.data)
                );
                worker.addEventListener("error", (e: ErrorEvent) =>
                    this.error(e)
                );
            }
            worker.postMessage(x, tx || []);
        }
    }

    done() {
        super.done();
        if (this.terminate > 0) {
            setTimeout(() => {
                LOGGER.info("terminating workers...");
                this.workers.forEach((worker) => worker && worker.terminate());
                delete (<any>this).workers;
            }, this.terminate);
        }
    }
}

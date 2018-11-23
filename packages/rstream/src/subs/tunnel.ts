import { DEBUG, State } from "../api";
import { Subscription } from "../subscription";
import { makeWorker } from "../utils/worker";

export interface TunnelOpts<A> {
    /**
     * Tunnelled worker instance, source blob or script URL.
     * If `interrupt` is enabled, the worker MUST be given as blob or URL.
     */
    src: Worker | Blob | string;
    /**
     * Optional subscription ID to use.
     */
    id?: string;
    /**
     * Optional function to extract transferables from incoming stream
     * values, e.g. ArrayBuffers. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage
     */
    transferables?: (x: A) => any[];
    /**
     * If given and greater than zero, the worker will be terminated
     * after given period (in millis) after the parent stream is done.
     *
     * Default: 0
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
 * Creates a new worker `Tunnel` instance with given options. This
 * subscription type processes received values via the configured worker
 * and then passes any values received back from the worker on to
 * downstream subscriptions, thereby allowing workers to be used
 * transparently for stream processing.
 *
 * @param opts
 */
export const tunnel = <A, B>(opts: TunnelOpts<A>) =>
    new Tunnel<A, B>(opts);

export class Tunnel<A, B> extends Subscription<A, B> {

    worker: Worker;
    src: Worker | Blob | string;
    transferables: (x: A) => any[];
    terminate: number;
    interrupt: boolean;

    constructor(opts: TunnelOpts<A>) {
        super(null, null, null, opts.id || `tunnel-${Subscription.NEXT_ID++}`);
        this.src = opts.src;
        this.transferables = opts.transferables;
        this.terminate = opts.terminate || 0;
        this.interrupt = opts.interrupt;
    }

    next(x: A) {
        if (this.state < State.DONE) {
            let tx;
            if (this.transferables) {
                tx = this.transferables(x);
            }
            if (this.interrupt && this.worker) {
                this.worker.terminate();
                this.worker = null;
            }
            if (!this.worker) {
                this.worker = makeWorker(this.src);
                this.worker.addEventListener(
                    "message",
                    (e: MessageEvent) => this.dispatch(e.data)
                );
                this.worker.addEventListener(
                    "error",
                    (e: ErrorEvent) => this.error(e)
                );
            }
            this.worker.postMessage(x, tx);
        }
    }

    done() {
        super.done();
        if (this.terminate > 0) {
            setTimeout(() => {
                DEBUG && console.log("terminating worker...");
                this.worker.terminate();
            }, this.terminate);
        }
    }
}

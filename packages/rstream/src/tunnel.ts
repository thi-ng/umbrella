import { DEBUG, State } from "./api";
import { Subscription } from "./subscription";
import { makeWorker } from "./utils/worker";

export interface TunnelOpts<A> {
    src: Worker | Blob | string;
    id?: string;
    transferrables?: (x: A) => any[];
    terminate?: number;
    interrupt?: boolean;
}

export const tunnel = <A, B>(opts: TunnelOpts<A>) =>
    new Tunnel<A, B>(opts);

export class Tunnel<A, B> extends Subscription<A, B> {

    opts: TunnelOpts<A>;
    worker: Worker;

    constructor(opts: TunnelOpts<A>) {
        super(null, null, null, opts.id || `tunnel-${Subscription.NEXT_ID++}`);
        this.opts = {
            terminate: 0,
            interrupt: false,
            ...opts
        };
    }

    next(x: A) {
        if (this.state < State.DONE) {
            const opts = this.opts;
            let tx;
            if (opts.transferrables) {
                tx = opts.transferrables(x);
            }
            if (opts.interrupt && this.worker) {
                this.worker.terminate();
                this.worker = null;
            }
            if (!this.worker) {
                this.worker = makeWorker(opts.src);
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
        const terminate = this.opts.terminate;
        if (terminate > 0) {
            setTimeout(() => {
                DEBUG && console.log("terminating worker...");
                this.worker.terminate();
            }, terminate);
        }
    }
}
import { CommonOpts, State } from "./api";
import { __optsWithID } from "./idgen";
import { Subscription } from "./subscription";

export interface TimeoutOpts extends CommonOpts {
    /**
     * Error object.
     */
    error: any;
    /**
     * True, if timeout resets with each received value.
     *
     * @defaultValue false
     */
    reset: boolean;
}

/**
 * Returns a {@link Subscription} that calls the
 * {@link ISubscriber.error} handlers of all child subscriptions with an
 * arbitrary error object after a given time.
 *
 * @remarks
 * If no `error` is given, uses a new `Error` instance by default. If
 * `resetTimeout` is false (default), the error is emitted regardless of
 * any received values in the meantime. However, if `true`, the timeout
 * resets with each received value and then only triggers once the time
 * interval since the last value has exceeded.
 *
 * @param timeoutMs - timeout period in milliseconds
 * @param opts -
 */
export const timeout = <T>(
    timeoutMs: number,
    opts?: Partial<TimeoutOpts>
): Subscription<T, T> => new Timeout(timeoutMs, opts);

/**
 * @see {@link timeout} for reference & examples.
 */
class Timeout<T> extends Subscription<T, T> {
    protected timeoutMs: number;
    protected timeoutId: any;
    protected errorObj: any;
    protected resetTimeout: boolean;

    constructor(timeoutMs: number, opts?: Partial<TimeoutOpts>) {
        opts = __optsWithID("timeout", opts);
        super(undefined, opts);
        this.timeoutMs = timeoutMs;
        this.errorObj = opts.error;
        this.resetTimeout = opts.reset === true;
        this.reset();
    }

    next(x: T) {
        if (this.resetTimeout) {
            clearTimeout(this.timeoutId);
            this.reset();
        }
        super.next(x);
    }

    reset() {
        this.timeoutId = setTimeout(() => {
            if (this.state < State.DONE) {
                this.dispatchTo(
                    "error",
                    this.errorObj ||
                        new Error(
                            `Timeout '${this.id}' after ${this.timeoutMs} ms`
                        )
                );
            }
        }, this.timeoutMs);
    }

    release() {
        clearTimeout(this.timeoutId);
        super.release();
    }
}

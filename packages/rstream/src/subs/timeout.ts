import { State } from "../api"
import { Subscription } from "../subscription";

/**
 * A subscription that emits an arbitrary error object after a given
 * time. If no `error` is given, uses a new `Error` instance by default.
 * If `resetTimeout` is false (default), the error is emitted regardless
 * of any received values in the meantime. However, if `true`, the
 * timeout resets with each received value and then only triggers once
 * the time interval since the last value has exceeded.
 *
 * @param timeoutMs timeout period in milliseconds
 * @param error error object
 * @param resetTimeout timeout reset flag
 * @param id subscription id
 */
export function timeout<T>(timeoutMs: number, error?: any, resetTimeout = false, id?: string): Subscription<T, T> {
    return new Timeout(timeoutMs, error, resetTimeout, id);
}

class Timeout<T> extends Subscription<T, T> {
    protected timeoutMs: number;
    protected timeoutId: any;
    protected errorObj: any;
    protected resetTimeout: boolean;

    constructor(timeoutMs: number, error?: any, resetTimeout = false, id?: string) {
        super(null, null, null, id || `timeout-${Subscription.NEXT_ID++}`);
        this.timeoutMs = timeoutMs;
        this.errorObj = error;
        this.resetTimeout = resetTimeout;
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
                this.error(
                    this.errorObj ||
                    new Error(`Timeout stream "${this.id}" after ${this.timeoutMs} ms`)
                );
            }
        }, this.timeoutMs);
    }

    cleanup(): void {
        clearTimeout(this.timeoutId);
        super.cleanup();
    }
}

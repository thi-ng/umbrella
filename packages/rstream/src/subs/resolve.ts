import { IID } from "@thi.ng/api/api";

import { __State, DEBUG, State } from "../api";
import { Subscription } from "../subscription";

export interface ResolverOpts extends IID<string> {
    /**
     * Error handler for failed promises.
     */
    fail: (e: any) => void;
}

/**
 * Creates a new subscription which receives promises, buffers them and
 * then passes their resolved values downstream. If the optional `fail`
 * handler is provided, it'll be called with the error of each failed
 * promise. If none is provided, the sub's `error()` handler is called,
 * which then stops the sub from receiving further values.
 *
 * ```
 * fromIterable([1, 2, 3], 100)
 *   .transform(tx.delayed(1000))
 *   .subscribe(resolve())
 *   .subscribe(trace("result"))
 * // result 1
 * // result 2
 * // result 3
 * // result done
 * ```
 *
 * @param opts
 */
export function resolve<T>(opts?: Partial<ResolverOpts>) {
    return new Resolver<T>(opts);
}

export class Resolver<T> extends Subscription<Promise<T>, T> {

    protected outstanding = 0;
    protected fail: (e: any) => void;

    constructor(opts: Partial<ResolverOpts> = {}) {
        super(null, null, null, opts.id || `resolve-${Subscription.NEXT_ID++}`);
        this.fail = opts.fail;
    }

    next(x: Promise<T>) {
        this.outstanding++;
        x.then(
            (y) => {
                if (this.state < State.DONE) {
                    this.dispatch(y);
                    if (--this.outstanding === 0) {
                        this.done();
                    }
                } else {
                    DEBUG && console.log(`resolved value in ${__State[this.state]} state (${x})`);
                }
            },
            (e) => {
                if (this.fail) {
                    this.fail(e);
                }
                else {
                    this.error(e);
                }
            }
        );
    }

    done() {
        if (this.parent.getState() === State.DONE && this.outstanding === 0) {
            super.done();
        }
    }
}

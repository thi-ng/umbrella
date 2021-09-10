import type { Fn } from "@thi.ng/api";
import type { IID } from "@thi.ng/api";
import { LOGGER, State } from "../api";
import { Subscription } from "../subscription";
import { optsWithID } from "../utils/idgen";

export interface ResolverOpts extends IID<string> {
    /**
     * Error handler for failed promises.
     */
    fail: Fn<any, void>;
}

/**
 * Creates a {@link Subscription} which receives promises, buffers them
 * and then passes their resolved values downstream.
 *
 * @remarks
 * If the optional `fail` handler is provided, it'll be called with the
 * error of each failed promise. If none is provided, the sub's
 * {@link ISubscriber.error} handler is called, which then stops the sub
 * from receiving further values.
 *
 * @example
 * ```ts
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
 * @param opts -
 */
export const resolve = <T>(opts?: Partial<ResolverOpts>) =>
    new Resolver<T>(opts);

export class Resolver<T> extends Subscription<Promise<T>, T> {
    protected outstanding = 0;
    protected fail?: Fn<any, void>;

    constructor(opts: Partial<ResolverOpts> = {}) {
        super(undefined, optsWithID("resolve"));
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
                    LOGGER.warn(`resolved value in state ${this.state} (${x})`);
                }
            },
            (e) => {
                if (this.fail) {
                    this.fail(e);
                } else {
                    this.error(e);
                }
            }
        );
    }

    done() {
        if (
            this.parent &&
            this.parent.getState() === State.DONE &&
            this.outstanding === 0
        ) {
            super.done();
        }
    }
}

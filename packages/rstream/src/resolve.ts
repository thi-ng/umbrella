// SPDX-License-Identifier: Apache-2.0
import type { Fn, IID } from "@thi.ng/api";
import { State } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { LOGGER } from "./logger.js";
import { Subscription } from "./subscription.js";

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
 * ```ts tangle:../export/resolve.ts
 * import { fromIterable, resolve, trace } from "@thi.ng/rstream";
 * import { delayed } from "@thi.ng/transducers";
 *
 * fromIterable([1, 2, 3], { delay: 500 })
 *   .transform(delayed(1000))
 *   .subscribe(resolve())
 *   .subscribe(trace("result"));
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
		super(undefined, __optsWithID("resolve"));
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
		const pstate = this.parent?.getState();
		if (
			(pstate === State.DONE || pstate === State.UNSUBSCRIBED) &&
			this.outstanding === 0
		) {
			super.done();
		}
	}
}

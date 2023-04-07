import type { Predicate } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { State, type CommonOpts, type ISubscribable } from "./api.js";
import { ASidechain } from "./asidechain.js";
import { __optsWithID } from "./idgen.js";
import { Subscription } from "./subscription.js";

export interface SidechainTriggerOpts<T> extends CommonOpts {
	pred: Predicate<T>;
}

export const sidechainTrigger = <T, S>(
	side: ISubscribable<S>,
	opts?: Partial<SidechainTriggerOpts<S>>
): Subscription<T, T> => new SidechainTrigger(side, opts);

export class SidechainTrigger<T, S> extends ASidechain<T, S, T> {
	buf: T | typeof SEMAPHORE = SEMAPHORE;

	constructor(
		side: ISubscribable<S>,
		opts?: Partial<SidechainTriggerOpts<S>>
	) {
		opts = __optsWithID("sidetrigger", opts);
		super(opts);
		const pred = opts.pred || (() => true);
		this.sideSub = side.subscribe({
			next: (x) => {
				if (this.buf !== SEMAPHORE && pred(x)) {
					this.dispatch(this.buf);
				}
			},
			done: () => this.done(),
		});
	}

	next(x: T) {
		if (this.state < State.DONE) {
			this.buf = x;
		}
	}
}

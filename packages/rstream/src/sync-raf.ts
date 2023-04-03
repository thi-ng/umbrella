import { isNode } from "@thi.ng/checks/is-node";
import { State, type CommonOpts, type ISubscribable } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { Subscription } from "./subscription.js";

/**
 * See {@link syncRAF} for details.
 */
export class SyncRAF<T> extends Subscription<T, T> {
	queued?: T;
	raf?: number | NodeJS.Timeout;

	constructor(opts?: Partial<CommonOpts>) {
		super(undefined, opts);
	}

	next(x: T) {
		if (this.state >= State.DONE) return;
		this.queued = x;
		if (!this.raf) {
			const update = () => {
				if (this.state < State.DONE) super.next(this.queued!);
				this._clean();
			};
			this.raf = isNode()
				? setTimeout(update, 16)
				: requestAnimationFrame(update);
		}
	}

	done() {
		this._clean();
		super.done();
	}

	error(e: any) {
		this._clean();
		return super.error(e);
	}

	protected _clean() {
		if (this.raf) {
			isNode()
				? clearTimeout(this.raf)
				: cancelAnimationFrame(<number>this.raf);
		}
		this.raf = this.queued = undefined;
	}
}

/**
 * Similar to (in in effect the same as the **now deprecated**)
 * {@link sidechainPartitionRAF}, however more performant & lightweight.
 * Synchronizes downstream processing w/ `requestAnimationFrame()`. The returned
 * subscription delays & debounces any high frequency intra-frame input values
 * and passes only most recent one downstream during next RAF event processing.
 *
 * This example uses thi.ng/atom as state container. Also see {@link fromAtom}.
 *
 * @example
 * ```ts
 * const atom = defAtom("alice");
 *
 * // any changes to the atom will only be received by this subscription
 * // during next RAF update cycle
 * syncRAF(fromAtom(atom)).subscribe({
 *   next({ name }) { document.body.innerText = name; }
 * });
 *
 * // trigger update
 * atom.reset("bob");
 * ```
 *
 * @param src -
 * @param opts -
 */
export const syncRAF = <T>(
	parent: ISubscribable<T>,
	opts?: Partial<CommonOpts>
) =>
	parent.subscribe(
		new SyncRAF<T>(__optsWithID(`syncraf-${parent.id}`, opts))
	);

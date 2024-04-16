import type { Fn, Fn0 } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors/illegal-state";

/**
 * Creates a new {@link Mult} instance which allows splitting a single `src`
 * async iterable into multiple parallel subscribers. Iteration only starts when
 * the first subscriber is attached (via {@link Mult.subscribe}) and back
 * pressure is handled by waiting for **all** child subscribers to deliver their
 * values before the next value from `src` is consumed. `Mult` allows dynamic
 * subscriptions and unsubscriptions and will stop consuming from `src` when no
 * further subscribers are attached.
 *
 * @example
 * ```ts tangle:../export/mult.ts
 * import { map, mult, run, wait } from "@thi.ng/transducers-async";
 *
 * const root = mult(
 *   (async function* () {
 *     yield "hello";
 *     await wait(1000);
 *     yield "world";
 *     await wait(1000);
 *     yield "good bye";
 *   })()
 * );
 *
 * // 1st subscriber (vanilla JS)
 * (async () => {
 *   for await (let x of root.subscribe()) console.log("vanilla:", x);
 * })();
 *
 * // 2nd subscriber (transducer), attached with delay
 * setTimeout(
 *   () =>
 *     run(
 *       map(async (x) => {
 *         console.log("tx", x);
 *         await wait(1500);
 *       }),
 *       root.subscribe()
 *     ),
 *   900
 * );
 *
 * // vanilla: hello
 * // vanilla: world
 * // tx world
 * // vanilla: good bye
 * // tx good bye
 * ```
 *
 * @param src
 */
export const mult = <T>(src: AsyncIterable<T>) => new Mult<T>(src);

export class Mult<T> {
	protected subs: MSub<T>[] = [];
	protected isActive = false;

	constructor(public src: AsyncIterable<T>) {}

	/**
	 * Creates a new subscription (aka custom `AsyncIterable`) which will
	 * receive any future values from `src`. The returned subscription can be
	 * removed again via {@link Mult.unsubscribe}.
	 */
	subscribe(): AsyncIterable<T> {
		const sub = new MSub<T>();
		this.subs.push(sub);
		if (!this.isActive) {
			this.isActive = true;
			(async () => {
				for await (let val of this.src) {
					for (let s of this.subs) s.resolve(val);
					if (val === undefined) this.subs.length = 0;
					if (!this.subs.length) break;
					await Promise.all(this.subs.map((x) => x.notifyP));
				}
				for (let s of this.subs) s.resolve(undefined);
				this.subs.length = 0;
				this.isActive = false;
			})();
		}
		return sub;
	}

	/**
	 * Attempts to remove given child subscription (presumably created via
	 * {@link Mult.subscribe}). Returns true if removal was successful.
	 *
	 * @param sub
	 */
	unsubscribe(sub: AsyncIterable<T>) {
		const idx = this.subs.findIndex((x) => x === sub);
		if (idx >= 0) {
			this.subs.splice(idx, 1);
			(<MSub<T>>sub).resolve(undefined);
			return true;
		}
		return false;
	}
}

class MSub<T> {
	valueP!: Promise<T | undefined>;
	notifyP!: Promise<void>;
	resolve!: Fn<T | undefined, void>;
	notify!: Fn0<void>;
	active = false;

	constructor() {
		this.$await();
	}

	async *[Symbol.asyncIterator]() {
		if (this.active) illegalState("multiple consumers unsupported");
		this.active = true;
		while (true) {
			const res = await this.valueP;
			if (res === undefined) break;
			yield res;
			this.notify();
			this.$await();
		}
		this.active = false;
	}

	protected $await() {
		this.notifyP = new Promise((res) => (this.notify = res));
		this.valueP = new Promise((res) => (this.resolve = res));
	}
}

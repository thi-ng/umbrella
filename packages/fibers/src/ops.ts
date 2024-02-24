import type { Fn, Fn0, Nullable, Predicate } from "@thi.ng/api";
import { shuffle as $shuffle } from "@thi.ng/arrays/shuffle";
import { now, timeDiff } from "@thi.ng/bench/now";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import {
	STATE_ACTIVE,
	STATE_DONE,
	STATE_ERROR,
	type FiberOpts,
	type MaybeFiber,
	type State,
} from "./api.js";
import { Fiber, fiber } from "./fiber.js";

/**
 * Returns co-routine which "blocks" for given number of milliseconds or
 * indefinitely.
 *
 * @param delay
 */
export const wait = (delay?: number) =>
	delay !== undefined
		? untilPromise(
				new Promise<void>((resolve) => setTimeout(resolve, delay))
		  )
		: fiber(function* () {
				while (true) yield;
		  });

/**
 * Returns ES6 generator which "blocks" for given number of frames.
 *
 * @param delay
 */
export function* waitFrames(delay: number) {
	while (delay-- > 0) yield;
}

/**
 * Returns a fiber which executes given fibers in sequence until all are
 * complete or one of them errored or got canceled.
 *
 * @param fibers
 * @param opts
 */
export const sequence = (
	fibers: Iterable<MaybeFiber>,
	opts?: Partial<FiberOpts>
) =>
	fiber(function* (ctx) {
		for (let fiber of fibers) {
			const $fiber = ctx.fork(fiber);
			while ($fiber.isActive()) yield;
			if ($fiber.state === STATE_ERROR) throw $fiber.error;
			ctx.value = $fiber.value;
			if ($fiber.state > STATE_DONE || ctx.state > STATE_ACTIVE) break;
		}
		return ctx.value;
	}, opts);

/**
 * Returns a fiber which executes given fibers as child processes until **one**
 * of them is finished/terminated. That child fiber itself will be the result.
 *
 * @remarks
 * Also see {@link withTimeout}, {@link all}.
 *
 * @example
 * ```ts
 * import { first, untilEvent, wait } from "@thi.ng/fibers";
 *
 * // wait until mouse click for max 5 seconds
 * const res = yield* first([
 *   untilEvent(window, "click", { id: "click" }),
 *   wait(5000)
 * ]);
 *
 * // one way to check result
 * if (res.id === "click") { ... }
 * ```
 *
 * @param fibers
 * @param opts
 */
export const first = (
	fibers: Iterable<MaybeFiber>,
	opts?: Partial<FiberOpts>
) =>
	fiber<Fiber>(function* (ctx) {
		const $fibers = [...fibers].map((f) => ctx.fork(f));
		while (true) {
			for (let f of $fibers) {
				if (!f.isActive()) return f;
			}
			yield;
		}
	}, opts);

/**
 * Returns a fiber which executes given fibers as child processes until **all**
 * of them are finished/terminated.
 *
 * @remarks
 * Also see {@link first}.
 *
 * @param fibers
 * @param opts
 */
export const all = (fibers: Iterable<MaybeFiber>, opts?: Partial<FiberOpts>) =>
	fiber<void>((ctx) => {
		ctx.forkAll(...fibers);
		return ctx.join();
	}, opts);

/**
 * Syntax sugar common use cases of {@link first} where a child fiber should be
 * limited to a max. time period before giving up.
 *
 * @example
 * ```ts
 * import { untilPromise, withTimeout } from "@thi.ng/fibers";
 *
 * // wait for fetch response max. 5 seconds
 * const res = yield* withTimeout(untilPromise(fetch("example.json")), 5000);
 *
 * if (res.deref() != null) { ... }
 * ```
 *
 * @param body
 * @param timeout
 * @param opts
 */
export const withTimeout = (
	body: MaybeFiber,
	timeout: number,
	opts?: Partial<FiberOpts>
) => first([body, wait(timeout)], opts);

/**
 * Higher-order fiber which repeatedly executes given `fiber` until its
 * completion, but does so in a time-sliced manner, such that the fiber never
 * consumes more than `maxTime` milliseconds per update cycle.
 *
 * @param fiber
 * @param maxTime
 * @param opts
 */
export const timeSlice = (
	body: MaybeFiber,
	maxTime: number,
	opts?: Partial<FiberOpts>
) =>
	fiber(function* () {
		const $fiber = fiber(body);
		while (true) {
			let t0 = now();
			do {
				if ($fiber.state > STATE_ACTIVE || $fiber.next() > STATE_ACTIVE)
					return;
			} while (timeDiff(t0, now()) < maxTime);
			yield;
		}
	}, opts);

/**
 * Similar to {@link timeSlice}, but for consuming the given iterable in a
 * time-sliced manner. With each fiber update consumes & buffers values from
 * `src` in chunks for `maxTime` milliseconds, then passes recorded chunk to
 * given `consume` function in order to process these values further.
 *
 * @example
 * ```ts
 * import { timeSliceIterable } from "@thi.ng/fibers";
 * import { range } from "@this.ng/transducers";
 *
 * // consume & batch process iterable in 16ms time slices
 * timeSliceIterable(
 *   range(1_000_000),
 *   (chunk) => console.log(chunk),
 *   16
 * ).run();
 * ```
 *
 * @param src
 * @param consume
 * @param maxTime
 * @param opts
 */
export const timeSliceIterable = <T>(
	src: Iterable<T>,
	consume: Fn<T[], void>,
	maxTime: number,
	opts?: Partial<FiberOpts>
) =>
	fiber(function* () {
		const iter = src[Symbol.iterator]();
		while (true) {
			let t0 = now();
			const buf: T[] = [];
			do {
				const { value, done } = iter.next();
				if (done) {
					consume(buf);
					return;
				}
				buf.push(value);
			} while (timeDiff(t0, now()) < maxTime);
			consume(buf);
			yield;
		}
	}, opts);

/**
 * Returns a fiber which "blocks" until given predicate function returns true.
 *
 * @remarks
 * See {@link untilState} for stateful version.
 *
 * @param pred
 */
export function* until(pred: Fn0<boolean>) {
	while (!pred()) yield;
}

/**
 * Stateful version of {@link until}. Takes an arbitrary `state`
 * value/container and returns a fiber which "blocks" until given predicate
 * function returns true. The `state` is passed to the predicate in each
 * iteration.
 *
 * @param state
 * @param pred
 */
export function* untilState<T>(state: T, pred: Predicate<T>) {
	while (!pred(state)) yield;
}

/**
 * Returns a fiber which "blocks" until the given `promise` resolves or rejects.
 * In the latter case, the fiber will throw the received error.
 *
 * @remarks
 * If the fiber was added to a parent {@link Fiber}, the error will be logged
 * and the fiber removed from the parent. See {@link Fiber.next} for details.
 *
 * @param promise
 * @param opts
 */
export const untilPromise = <T>(
	promise: PromiseLike<T>,
	opts?: Partial<FiberOpts>
) =>
	fiber<T>(function* (ctx) {
		let error: Nullable<Error>;
		promise.then(
			(x) => ctx.done(x),
			(e) => (error = e)
		);
		while (true) {
			if (error) throw error;
			yield;
		}
	}, opts);

/**
 * Returns fiber which attaches a one-off event handler for event `type` to
 * `target` and then "blocks" until the event occurred.
 *
 * @remarks
 * The event handler will be removed when the fiber terminates. Upon completion,
 * the event will be the fiber's {@link Fiber.value}.
 *
 * @param target
 * @param type
 * @param opts
 */
export const untilEvent = (
	target: EventTarget,
	type: string,
	opts?: Partial<FiberOpts>
) => {
	let listener: EventListener;
	return fiber(null, {
		...opts,
		init(ctx: Fiber) {
			listener = (e) => ctx.done(e);
			target.addEventListener(type, listener);
		},
		deinit() {
			target.removeEventListener(type, listener);
		},
	});
};

/**
 * Custom fiber implementation for {@link shuffle}.
 */
export class Shuffle extends Fiber {
	rnd: IRandom;

	constructor(
		fibers: Iterable<MaybeFiber>,
		opts?: Partial<FiberOpts & { rnd: IRandom }>
	) {
		super((ctx) => ctx.join(), opts);
		this.rnd = opts?.rnd || SYSTEM;
		this.forkAll(...fibers);
	}

	next(): State {
		if (!this.isActive()) return this.state;
		$shuffle(this.children!, this.children!.length, this.rnd);
		return super.next();
	}
}

/**
 * Higher-order fiber for creating a constantly randomized execution order of
 * given `fibers`, e.g. for distributing workloads. Creates and returns a new
 * fiber as parent of the given `fibers` which then shuffles their execution
 * order on each {@link Fiber.next} invocation/update. The fiber terminates when
 * all children are done.
 *
 * @remarks
 * The `rnd` option can be used to customize the
 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html)
 * implementation used for shuffling. Defaults to
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @example
 * ```ts
 * import { shuffle } from "@thi.ng/fibers";
 * import { repeatedly } from "@thi.ng/transducers";
 *
 * // create & run fiber with 4 children, executing in random order
 * shuffle(
 *   repeatedly(
 *     (id) => function*() { while(true) { console.log(`worker #{id}`); yield; } },
 *     4
 *   )
 * ).run()
 *
 * // worker #0
 * // worker #1
 * // worker #3
 * // worker #3
 * // worker #2
 * // worker #0
 * // worker #2
 * // ...
 * ```
 *
 * @param fibers
 * @param opts
 */
export const shuffle = (
	fibers: Iterable<MaybeFiber>,
	opts?: Partial<FiberOpts & { rnd: IRandom }>
) => new Shuffle(fibers, opts);

/**
 * Helper function to await fiber-based task completion from within an `async`
 * context. Wraps given `task` in a fiber with custom {@link FiberOpts.deinit}
 * and {@link FiberOpts.catch} handlers and executes it. Returns a promise which
 * resolves with that fiber's final value once its complete. If there is an
 * error during fiber execution the promise will be rejected with that original
 * error.
 *
 * @remarks
 * If `opts` are given, their {@link FiberOpts.deinit} and
 * {@link FiberOpts.catch} handlers will be augmented with resolving/rejecting
 * the promise. I.e. The promise will NOT be rejected if there's a user-provided
 * `catch` handler indicating the error has been dealt with.
 *
 * @example
 * ```ts
 * import { asPromise } from "@thi.ng/fibers";
 *
 * (async () => {
 *   // create & spawn task/fiber
 *   const task = asPromise(function*() {
 *     for(let i = 0; i< 3; i++) {
 *       console.log("working...", i);
 *       yield* wait(1000);
 *     }
 *     return 42;
 *   });
 *   // now wait for task to complete
 *   const result = await task;
 *   console.log("final result", result);
 * })()
 * ```
 *
 * @param task
 */
export const asPromise = <T>(task: MaybeFiber<T>, opts?: Partial<FiberOpts>) =>
	new Promise<T>((resolve, reject) => {
		fiber(task, {
			...opts,
			deinit: (ctx) => {
				opts?.deinit && opts.deinit(ctx);
				ctx.state < STATE_ERROR && resolve(ctx.deref()!);
			},
			catch: (ctx, e) => {
				if (opts?.catch && opts.catch(ctx, e)) return true;
				reject(e);
				return false;
			},
		}).run();
	});

import type { Fn0, Nullable, Predicate } from "@thi.ng/api";
import { now, timeDiff } from "@thi.ng/bench/now";
import {
	STATE_ACTIVE,
	STATE_DONE,
	STATE_ERROR,
	type FiberFactory,
	type FiberOpts,
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
		? untilState(now(), (t0) => timeDiff(t0, now()) >= delay)
		: (function* () {
				while (true) yield;
		  })();

/**
 * Returns co-routine which "blocks" for given number of frames.
 *
 * @param delay
 */
export function* waitFrames(delay: number) {
	while (delay-- <= 0) yield;
}

/**
 * Returns a fiber which executes given fibers in sequence until all are
 * complete or one of them errored or got canceled.
 *
 * @param fibers
 * @param opts
 */
export const sequence = (
	fibers: Iterable<Fiber | FiberFactory | Generator>,
	opts?: Partial<FiberOpts>
) =>
	fiber(function* (ctx) {
		for (let fiber of fibers) {
			const $fiber = ctx.fork(fiber);
			while ($fiber.state <= STATE_ACTIVE) yield;
			if ($fiber.state === STATE_ERROR) throw $fiber.error;
			ctx.value = $fiber.value;
			if ($fiber.state > STATE_DONE || ctx.state > STATE_ACTIVE) break;
		}
		return ctx.value;
	}, opts);

/**
 * Returns a fiber which executes given fibers as child processes until **one**
 * of them is finished/terminated.
 *
 * @param fibers
 * @param opts
 */
export const first = (
	fibers: (Fiber | FiberFactory | Generator)[],
	opts?: Partial<FiberOpts>
) =>
	fiber<Fiber>(function* (ctx) {
		const $fibers = fibers.map((f) => ctx.fork(f));
		while (true) {
			for (let f of $fibers) {
				if (f.state > STATE_ACTIVE) return f;
			}
			yield;
		}
	}, opts);

/**
 * Returns a fiber which executes given fibers as child processes until **all**
 * of them are finished/terminated.
 *
 * @param fibers
 * @param opts
 */
export const all = (
	fibers: (Fiber | FiberFactory | Generator)[],
	opts?: Partial<FiberOpts>
) =>
	fiber<void>((ctx) => {
		for (let f of fibers) ctx.fork(f);
		return ctx.join();
	}, opts);

/**
 * Higher-order fiber which repeatedly executes given `fiber` until its
 * completion, but does so in a time-sliced manner, such that the fiber never
 * consumes more than `maxTime` milliseconds per update cycle.
 *
 * @param maxTime
 * @param fiber
 * @param opts
 */
export const timeSlice = (
	maxTime: number,
	body: Fiber | FiberFactory | Generator,
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
 * @remove
 * If the erroring fiber was added directly to a {@link FiberPool}, the error
 * will be logged and the fiber removed. See {@link FiberPool.update} for
 * details.
 *
 * @param promise
 */
export const untilPromise = <T>(promise: PromiseLike<T>) =>
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
	});

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

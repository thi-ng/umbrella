import type {
	Event as $Event,
	Fn,
	Fn0,
	IDeref,
	IID,
	IIDGen,
	INotify,
	Listener,
	Nullable,
} from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { isFunction } from "@thi.ng/checks/is-function";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { monotonic, prefixed } from "@thi.ng/idgen";
import type { ILogger } from "@thi.ng/logger";
import {
	EVENT_FIBER_CANCELED,
	EVENT_FIBER_DONE,
	EVENT_FIBER_ERROR,
	STATE_ACTIVE,
	STATE_CANCELED,
	STATE_DONE,
	STATE_ERROR,
	STATE_NEW,
	type FiberEventType,
	type FiberFactory,
	type FiberOpts,
	type MaybeFiber,
	type State,
} from "./api.js";

let DEFAULT_ID_GEN: IIDGen<string> = prefixed("fib-", monotonic());

export const setDefaultIDGen = (gen: IIDGen<string>) => (DEFAULT_ID_GEN = gen);

const NO_RESULT: IteratorResult<any> = { done: false, value: undefined };

@INotifyMixin
export class Fiber<T = any>
	implements IDeref<T | undefined>, IID<string>, INotify<FiberEventType>
{
	/**
	 * This fiber's user provided or generated ID.
	 */
	readonly id!: string;
	/**
	 * This fiber's parent.
	 */
	readonly parent?: Fiber;
	gen: Nullable<Generator<unknown, T>>;
	idgen?: IIDGen<string>;

	state: State = STATE_NEW;
	children?: Fiber[];
	value?: T = undefined;
	error?: Error;
	logger?: ILogger;
	user?: Partial<Pick<FiberOpts, "init" | "deinit" | "catch">>;

	constructor(
		gen?: Nullable<FiberFactory<T> | Generator<unknown, T>>,
		opts?: Partial<FiberOpts>
	) {
		if (opts) {
			this.logger = opts.logger;
			this.parent = opts.parent;
			this.user = {
				init: opts.init,
				deinit: opts.deinit,
				catch: opts.catch,
			};
			if (opts.id) {
				this.id = opts.id;
			} else {
				this.idgen = opts.idgen || DEFAULT_ID_GEN;
			}
		} else {
			this.idgen = DEFAULT_ID_GEN;
		}
		if (!this.id && this.idgen) this.id = this.idgen.next();
		this.gen = isFunction(gen) ? gen(this) : gen;
	}

	/**
	 * Co-routine which blocks whilst this fiber (incl. its children) is active.
	 * Then return this fiber's value.
	 */
	*[Symbol.iterator]() {
		while (this.state <= STATE_ACTIVE && this.next() <= STATE_ACTIVE) yield;
		return this.value;
	}

	/**
	 * Returns this fiber's result value (if any). Only available if the fiber
	 * completed successfully and produced a value (either by returning a value
	 * from the fiber's generator or externally via {@link Fiber.done}).
	 */
	deref() {
		return this.value;
	}

	/**
	 * Returns child fiber for given `id`.
	 *
	 * @param id
	 */
	childForID(id: string) {
		if (this.children) {
			for (let child of this.children) {
				if (child.id === id) return child;
			}
		}
	}

	/**
	 * Adds given `body` as child process to this fiber. If not already a
	 * {@link Fiber} instance, it will be wrapped as such incl. with given
	 * options. `opts` are only used for this latter case and will inherit this
	 * (parent) fiber's {@link FiberOpts.logger} and {@link FiberOpts.idgen} as
	 * defaults. Returns child fiber.
	 *
	 * @remarks
	 * Child fibers are only processed when the parent is processed (e.g. via
	 * {@link Fiber.run} or via `yield* fiber`). Also see {@link Fiber.join} to
	 * wait for all child processes to finish.
	 *
	 * Non-active child process (i.e. finished, cancelled or errored) are
	 * automatically removed from the parent.
	 *
	 * @param f
	 * @param opts
	 */
	fork<F>(
		body?: Nullable<Fiber<F> | FiberFactory<F> | Generator<unknown, F>>,
		opts?: Partial<FiberOpts>
	) {
		if (this.state > STATE_ACTIVE)
			illegalState(`fiber (id: ${this.id}) not active`);
		const $fiber = fiber(body, {
			parent: this,
			logger: this.logger,
			idgen: this.idgen,
			...opts,
		});
		if (!this.children) this.children = [];
		this.children.push($fiber);
		this.logger?.debug("forking", $fiber.id);
		return $fiber;
	}

	/**
	 * Calls {@link Fiber.fork} for all given fibers and returns them as array.
	 *
	 * @param fibers
	 */
	forkAll(...fibers: MaybeFiber[]): Fiber[] {
		return fibers.map((f) => this.fork(f));
	}

	/**
	 * Waits for all child processes to complete/terminate. Use as `yield*
	 * fiber.join()`.
	 */
	*join() {
		this.logger?.debug("waiting for children...");
		while (this.children?.length) yield;
	}

	/**
	 * Processes a single iteration of this fiber and any of its children. Does
	 * nothing if the fiber is not active anymore. Returns fiber's state.
	 */
	next() {
		switch (this.state) {
			case STATE_NEW:
				this.init();
			// explicit fallthrough
			case STATE_ACTIVE:
				try {
					const { children } = this;
					if (children) {
						for (let i = 0, n = children.length; i < n; ) {
							const child = children[i];
							if (
								child.state > STATE_ACTIVE ||
								child.next() > STATE_ACTIVE
							) {
								children.splice(i, 1);
								n--;
							} else i++;
						}
					}
					const res = this.gen ? this.gen.next(this) : NO_RESULT;
					if (res.done) this.done(res.value);
				} catch (e) {
					this.catch(<Error>e);
				}
				break;
			default:
		}
		return this.state;
	}

	protected init() {
		this.logger?.debug("init", this.id);
		this.user?.init?.(this);
		this.state = STATE_ACTIVE;
	}

	protected deinit() {
		this.logger?.debug("deinit", this.id);
		this.user?.deinit?.(this);
		if (this.children) this.children = undefined;
		this.gen = null;
	}

	/**
	 * Cancels further processing of this fiber and its children (if any). Calls
	 * {@link Fiber.deinit} and emits {@link EVENT_FIBER_CANCELED} event.
	 *
	 * @remarks
	 * Function is a no-op if the fiber is not active anymore.
	 */
	cancel() {
		if (this.state >= STATE_DONE) return;
		this.logger?.debug("cancel", this.id);
		if (this.children) {
			for (let child of this.children) child.cancel();
		}
		this.deinit();
		this.state = STATE_CANCELED;
		this.idgen?.free(this.id);
		this.notify({ id: EVENT_FIBER_CANCELED, target: this });
	}

	/**
	 * Stops further processing of this fiber and its children (if any) and sets
	 * this fiber's value to given `value`. Calls {@link Fiber.deinit} and emits
	 * {@link EVENT_FIBER_DONE} event.
	 *
	 * @remarks
	 * Function is a no-op if the fiber is not active anymore.
	 *
	 * @param value
	 */
	done(value?: any) {
		if (this.state >= STATE_DONE) return;
		this.logger?.debug("done", this.id, value);
		this.value = value;
		if (this.children) {
			for (let child of this.children) child.done();
		}
		this.deinit();
		this.state = STATE_DONE;
		this.idgen?.free(this.id);
		this.notify({ id: EVENT_FIBER_DONE, target: this, value });
	}

	/**
	 * Stops further processing of this fiber and its children (if any) and sets
	 * this fiber's {@link Fiber.error} value to given `error`. Calls
	 * {@link Fiber.deinit} and emits {@link EVENT_FIBER_ERROR} event.
	 *
	 * @remarks
	 * Function is a no-op if the fiber already is in an error state.
	 *
	 * @param err
	 */
	catch(err: Error) {
		if (this.state >= STATE_ERROR || this.user?.catch?.(this)) return;
		this.logger
			? this.logger.severe(`error ${this.id}:`, err)
			: console.warn(`error ${this.id}:`, err);
		this.state = STATE_ERROR;
		this.error = err;
		this.deinit();
		this.idgen?.free(this.id);
		this.notify({ id: EVENT_FIBER_ERROR, target: this, value: err });
	}

	// @ts-ignore mixin
	// prettier-ignore
	addListener(id: FiberEventType, fn: Listener<FiberEventType>, scope?: any): boolean {}

	// @ts-ignore mixin
	// prettier-ignore
	removeListener(id: FiberEventType, fn: Listener<FiberEventType>, scope?: any): boolean {}

	// @ts-ignore mixin
	notify(event: $Event<FiberEventType>): boolean {}

	/**
	 * Calls {@link Fiber.runWith} using default loop handlers
	 * (`requestAnimationFrame()` in browsers, `setTimeout(fn, 16)` otherwise).
	 */
	run() {
		return this.runWith(
			typeof requestAnimationFrame === "function"
				? requestAnimationFrame
				: (fn) => setTimeout(fn, 16)
		);
	}

	/**
	 * Starts fiber execution using the provided higher-order loop/interval
	 * `handler` (e.g. see {@link Fiber.start}).
	 *
	 * @remarks
	 * That given `handler` is used to repeatedly schedule the next execution of
	 * {@link Fiber.next} (indirectly, via a zero-arg helper function passed to
	 * the `handler`).
	 *
	 * @example
	 * ```ts
	 * // start with custom higher frequency handler
	 * fiber(function*() {
	 *   while(true) {
	 *     console.log("hello");
	 *     yield;
	 *   }
	 * }).runWith(setImmediate);
	 * ```
	 *
	 * @param handler
	 */
	runWith(handler: Fn<Fn0<void>, void>) {
		this.logger?.debug(`running ${this.id}...`);
		const loop = () => {
			if (this.state <= STATE_ACTIVE && this.next() <= STATE_ACTIVE)
				handler(loop);
		};
		loop();
		return this;
	}
}

/**
 * Functional syntax sugar for {@link Fiber} constructor. The `opts` are only
 * used if given a generator or {@link FiberFactory}.
 *
 * @param fiber
 * @param opts
 */
export const fiber = <T>(
	fiber?: Nullable<Fiber<T> | FiberFactory<T> | Generator<unknown, T>>,
	opts?: Partial<FiberOpts>
) => (fiber != null && fiber instanceof Fiber ? fiber : new Fiber(fiber, opts));

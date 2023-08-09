import type { Fn, Fn2, IClear, IIDGen } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import type { Fiber } from "./fiber.js";

export type FiberFactory<T = any> = (
	f: Fiber<T>
) => Generator<unknown, T, unknown>;

export type MaybeFiber<T = any> =
	| Fiber<T>
	| FiberFactory<T>
	| Generator<unknown, T>;

export interface FiberOpts {
	/**
	 * Custom ID assigned to this fiber.
	 */
	id: string;
	/**
	 * ID generator instance for fiber ID (instead of {@link FiberOpts.id})
	 */
	idgen: IIDGen<string>;
	/**
	 * Logger instance.
	 */
	logger: ILogger;
	/**
	 * Parent {@link Fiber}.
	 *
	 * @internal
	 */
	parent: Fiber;
	/**
	 * If true (default: false), the fiber cancels itself once it has no more
	 * children. See {@link Fiber.cancel}.
	 *
	 * @remarks
	 * When enabling this option, ensure that the fiber has child processes
	 * attached **before** execution!
	 */
	terminate: boolean;
	/**
	 * User init handler
	 */
	init: Fn<Fiber, void>;
	/**
	 * User deinit handler.
	 */
	deinit: Fn<Fiber, void>;
	/**
	 * User error handler. If this function returns true, the error is
	 * considered caught and will **NOT** put the fiber into an error state.
	 * Otherwise, the fiber will stop further processing and cancel all child
	 * fibers (if any).
	 */
	catch: Fn2<Fiber, Error, boolean>;
}

export const STATE_NEW = 0;
export const STATE_ACTIVE = 1;
export const STATE_DONE = 2;
export const STATE_CANCELED = 3;
export const STATE_ERROR = 4;

export type State =
	| typeof STATE_NEW
	| typeof STATE_ACTIVE
	| typeof STATE_DONE
	| typeof STATE_CANCELED
	| typeof STATE_ERROR;

/**
 * Event ID for completed fiber. The event `value` will be the one given to
 * {@link Fiber.done} (if any).
 */
export const EVENT_FIBER_DONE = "fiber-done";
/**
 * Event ID for fiber cancellation.
 */
export const EVENT_FIBER_CANCELED = "fiber-canceled";
/**
 * Event ID for notifying about an error which occurred whilst executing a
 * fiber. The event `value` will be the error passed to {@link Fiber.catch}.
 */
export const EVENT_FIBER_ERROR = "fiber-error";

export type FiberEventType =
	| typeof EVENT_FIBER_DONE
	| typeof EVENT_FIBER_CANCELED
	| typeof EVENT_FIBER_ERROR
	| "*";

export interface IReadBuffer<T> {
	readable(): boolean;
	read(): T | undefined;
}

export interface IReadWriteBuffer<T> extends IReadBuffer<T>, IClear {
	writable(): boolean;
	write(x: T): void;
}

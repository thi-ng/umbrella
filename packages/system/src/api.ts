import type { Fn, Keys } from "@thi.ng/api";
import { ROOT } from "@thi.ng/logger/root";
import type { System } from "./system.js";

export interface ILifecycle<T extends SystemMap<T> = any> {
	/**
	 * Starts component. Defined as async method to simplify internal use of
	 * `await` for starting any child/sub-components. Usually called by
	 * {@link System.start} which synchronously starts all of its components in
	 * dependency order.
	 *
	 * Returns false to indicate component startup failed and to cancel startup
	 * of any further components. Alternatively, an error can be thrown, but
	 * it's the user's responsibility to catch it.
	 *
	 * If a component's start method returns false, any already started
	 * components will be stopped (see {@link ILifecycle.stop}) in reverse
	 * order.
	 */
	start?(sys: System<T>): Promise<boolean>;
	/**
	 * Similar to {@link ILifecycle.start} but for stopping components.
	 *
	 * Returns false to indicate component shutdown failed. Unlike with
	 * {@link ILifecycle.start}, returning false will **not** stop the shutdown
	 * of other components.
	 */
	stop?(sys: System<T>): Promise<boolean>;
	// allow extension and disable weak type detection
	// https://github.com/thi-ng/umbrella/issues/247#issuecomment-687196363
	[id: string]: any;
}

/**
 * Defines the participants of a system. Maps component names to their
 * respective types
 */
export type SystemMap<T> = Record<Keys<T>, ILifecycle>;

/**
 * Async system component initialization function.
 */
export type ComponentFactory<T extends SystemMap<T>> = Fn<
	T,
	Promise<ILifecycle>
>;

export interface SystemSpec<T extends SystemMap<T>> {
	/**
	 * Async system component initialization function.
	 */
	factory: ComponentFactory<T>;
	/**
	 * Component IDs which this component directly depends on. Used to construct
	 * the system's dependency graph and to initialize (and later start)
	 * components in the correct order.
	 */
	deps?: Keys<T>[];
}

/**
 * Definition object of system component specs, i.e. their factories and
 * component dependencies. The generic type arg `T` is used to infer &
 * validate all specs.
 */
export type SystemSpecs<T extends SystemMap<T>> = Record<
	Keys<T>,
	SystemSpec<T>
>;

/**
 * See [thi.ng/logger](https://docs.thi.ng/umbrella/logger/) for usage.
 */
export const LOGGER = ROOT.childLogger("system");

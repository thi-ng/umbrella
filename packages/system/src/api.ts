import type { Fn, ILogger, Keys } from "@thi.ng/api";
import { NULL_LOGGER } from "@thi.ng/api/logger";

export interface ILifecycle {
    /**
     * Starts component. Defined as async method to simplify internal
     * use of `await` for starting any child/sub-components. Usually
     * called by {@link System.start} which synchronously starts all of
     * its components in dependency order.
     *
     * Returns false to indicate component startup failed and to cancel
     * initialization of dependent components. Alternatively, an error
     * can be thrown, but it's the user's responsibility to catch it.
     */
    start?(): Promise<boolean>;
    /**
     * Similar to {@link ILifecycle.start} but for stopping components.
     *
     * Returns false to indicate component startup failed and log a
     * warning message to the console. Unlike with `start()`, returning
     * false will NOT stop decommision other components.
     */
    stop?(): Promise<boolean>;
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
 * Component initialization function.
 */
export type ComponentFactory<T extends SystemMap<T>> = Fn<T, ILifecycle>;

/**
 * Definition object of system component specs, i.e. their factories and
 * component dependencies. The generic type arg `T` is used to infer &
 * validate all specs.
 */
export type SystemSpecs<T extends SystemMap<T>> = Record<
    Keys<T>,
    {
        factory: ComponentFactory<T>;
        deps?: Keys<T>[];
    }
>;

/** @internal */
export let LOGGER = NULL_LOGGER;

/**
 * Sets package logger to given instance.
 *
 * @param logger
 */
export const setLogger = (logger: ILogger) => (LOGGER = logger);

import type { ILogger } from "@thi.ng/logger";
import { ConsoleLogger } from "@thi.ng/logger/console";

export type Fn0<A> = () => A;
export type Fn<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;

export type VoidFn = Fn0<void>;

export type LifecycleHandler = Fn<LifecycleCtx, void | Promise<void>>;

export type Test = Fn0<Promise<TestResult | TestResult[]>>;

export type Timestamp = number | bigint;

export interface TestOpts {
    fmt: StatusFormatters;
    logger: ILogger;
    timeOut: number;
    maxTrials: number;
}

export interface GroupOpts extends TestOpts, LifecycleHandlers {
    /**
     * Unless false, the first uncaught error (test failure) will cause the
     * entire group to fail.
     *
     * @defaultValue true
     */
    stop: boolean;
    /**
     * (Node env only) If true any test failures will also cause the Node
     * process to exit with failure code 1.
     *
     * @defaultValue false
     */
    exit: boolean;
}

export interface LifecycleHandlers {
    /**
     * Lifecycle hook to prepare user state and/or execute side effects before
     * **all** test cases in the group.
     */
    before?: LifecycleHandler;
    /**
     * Lifecycle hook to cleanup user state and/or execute side effects after
     * **all** test cases in the group.
     */
    after?: LifecycleHandler;
    /**
     * Lifecycle hook to prepare/reset user state and/or execute side effects
     * before **each** test case in the group.
     */
    beforeEach?: LifecycleHandler;
    /**
     * Lifecycle hook to cleanup user state and/or execute side effects after
     * **each** test case in the group.
     */
    afterEach?: LifecycleHandler;
}

export interface LifecycleCtx {
    logger: ILogger;
}

export interface TestCtx {
    /**
     * Successful completion signal/handler.
     */
    done: VoidFn;
    /**
     * Use in place of native setTimeout function
     */
    setTimeout: Fn2<VoidFn, number, any>;
    /**
     * Use in place of native clearTimeout function
     */
    clearTimeout: Fn<any, void>;
    /**
     * Logger instance (i.e. the one given via {@link GroupOpts} or
     * {@link TestOpts} or default logger from {@link GLOBAL_OPTS}).
     */
    logger: ILogger;
}

export interface TestResult {
    /**
     * Parent group ID/title.
     */
    group?: string;
    /**
     * Test title/descriptor
     */
    title: string;
    /**
     * Time taken (incl. retries) in milliseconds (rounded)
     */
    time: number;
    /**
     * Number of trials taken
     */
    trials: number;
    /**
     * Error, failure reason
     */
    error?: Error;
}

export interface StatusFormatters {
    /**
     * Formatter for successful test case. Receives `title` of test.
     */
    success: Fn<string, string>;
    /**
     * Formatter for failed test case. Receives `title` of test.
     */
    fail: Fn<string, string>;
    /**
     * Formatter for retrying a test case...
     */
    retry: Fn<string, string>;
}

/**
 * Global default config for {@link group} & {@link test}.
 */
export let GLOBAL_OPTS: GroupOpts = {
    stop: true,
    exit: false,
    maxTrials: 1,
    timeOut: 1000,
    logger: new ConsoleLogger("testament"),
    fmt: {
        success: (x) => `✔︎ ${x}`,
        fail: (x) => `✘ ${x}`,
        retry: (x) => x,
    },
};

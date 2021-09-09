import { Logger } from "./logger";

export type Fn0<A> = () => A;
export type Fn<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;

export type VoidFn = Fn0<void>;

export type Test = Fn0<Promise<TestResult | TestResult[]>>;

export type Timestamp = number | bigint;

export interface TestOpts {
    logger: ILogger;
    timeOut: number;
    maxTrials: number;
}

export interface GroupOpts extends TestOpts {
    /**
     * Lifecycle hook to prepare/reset user state before each test case in the
     * group.
     */
    beforeEach?: VoidFn;
    /**
     * Lifecycle hook to cleanup user state after each test case in the
     * group.
     */
    afterEach?: VoidFn;
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

/**
 * Replicated from thi.ng/api to avoid circular deps
 */
export interface ILogger {
    level: number;

    fine(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    severe(...args: any[]): void;
}

/**
 * Global default config for {@link group} & {@link test}.
 */
export let GLOBAL_OPTS: GroupOpts = {
    stop: true,
    exit: false,
    maxTrials: 1,
    timeOut: 1000,
    logger: new Logger(),
};

export type Fn0<A> = () => A;
export type Fn<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;

export type VoidFn = Fn0<void>;

export type Timestamp = number | bigint;

export interface TestOpts {
    logger: ILogger;
    timeOut: number;
    maxTries: number;
}

export interface GroupOpts extends TestOpts {
    beforeEach: VoidFn;
    afterEach: VoidFn;
    stop: boolean;
    exit: boolean;
}

export interface TestCtx {
    done: VoidFn;
    setTimeout: Fn2<VoidFn, number, any>;
}

export interface TestResult {
    title: string;
    time?: number;
    error?: Error;
}

export interface ILogger {
    level: number;

    fine(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    severe(...args: any[]): void;
}

export let TIMEOUT = 1000;

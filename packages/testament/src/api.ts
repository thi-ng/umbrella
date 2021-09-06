import { ConsoleLogger, Fn0, Fn2, ILogger } from "@thi.ng/api";

export interface TestOpts {
    logger: ILogger;
    timeOut: number;
    maxTries: number;
}

export interface GroupOpts extends TestOpts {
    beforeEach: Fn0<void>;
    afterEach: Fn0<void>;
    stop: boolean;
    exit: boolean;
}

export interface TestCtx {
    done: Fn0<void>;
    setTimeout: Fn2<Fn0<void>, number, any>;
}

export interface TestResult {
    title: string;
    time?: number;
    error?: Error;
}

export let LOGGER = new ConsoleLogger("testament");

export let TIMEOUT = 5000;

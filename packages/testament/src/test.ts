import {
    Fn,
    Fn0,
    GLOBAL_OPTS,
    TestCtx,
    TestOpts,
    TestResult,
    Timestamp,
} from "./api";
import { LOGGER } from "./logger";
import { now, timeDiff } from "./utils";

export const test = (
    title: string,
    fn: Fn<TestCtx, void>,
    opts?: Partial<TestOpts>
): Fn0<Promise<TestResult>> => {
    let { logger, timeOut, maxTrials } = {
        logger: LOGGER,
        ...GLOBAL_OPTS,
        ...opts,
    };

    return async () => {
        let tid: any;
        let userIds: any[] = [];
        let t0: Timestamp;
        let t1: Timestamp;
        let trials = 1;

        const clear = () => {
            if (tid != null) {
                clearTimeout(tid);
                tid = null;
            }
            if (userIds.length) {
                userIds.forEach((id) => clearTimeout(id));
                userIds.length = 0;
            }
        };

        const measure = () => t1 === -1 && (t1 = now());

        while (maxTrials!-- > 0) {
            t0 = t1 = -1;
            try {
                const p = new Promise<void>((resolve, reject) => {
                    tid = setTimeout(
                        () => reject(new Error("timeout")),
                        timeOut
                    );
                    const ctx: TestCtx = {
                        done: () => {
                            measure();
                            clear();
                            resolve();
                        },
                        setTimeout: (f, delay) =>
                            userIds.push(
                                setTimeout(() => {
                                    try {
                                        f();
                                    } catch (e) {
                                        clear();
                                        reject(e);
                                    }
                                }, delay)
                            ),
                    };
                    t0 = now();
                    fn(ctx);
                    if (!fn.length) ctx.done();
                }).catch((e) => {
                    throw e;
                });
                await p;
                const taken = timeDiff(t0!, t1!);
                logger.info(`✔︎ ${title}${taken > 10 ? ` [${taken} ms]` : ""}`);
                break;
            } catch (e) {
                clear();
                if (!maxTrials) {
                    logger.warn(`✘ ${title}`);
                    return {
                        title,
                        error: <Error>e,
                        time: timeDiff(t0!, now()),
                        trials,
                    };
                } else {
                    logger.debug(`retrying '${title}'...`);
                    trials++;
                }
            }
        }
        return { title, time: timeDiff(t0!, t1!), trials };
    };
};

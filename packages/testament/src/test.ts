import { Fn, TestCtx, TestOpts, TestResult, TIMEOUT, Timestamp } from "./api";
import { LOGGER } from "./logger";
import { now, timeDiff } from "./utils";

export const test = async (
    title: string,
    fn: Fn<TestCtx, void>,
    opts?: Partial<TestOpts>
): Promise<TestResult> => {
    let { logger, timeOut, maxTries } = {
        logger: LOGGER,
        timeOut: TIMEOUT,
        maxTries: 1,
        ...opts,
    };

    let tid: any;
    let userIds: any[] = [];
    let t0: Timestamp;
    let t1: Timestamp;

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

    while (maxTries-- > 0) {
        t0 = t1 = -1;
        try {
            const p = new Promise<void>((resolve, reject) => {
                tid = setTimeout(() => reject(new Error("timeout")), timeOut);
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
            const taken = ~~timeDiff(t0!, t1!);
            logger.info(`✔︎ ${title}${taken > 10 ? ` [${taken} ms]` : ""}`);
            break;
        } catch (e) {
            clear();
            if (!maxTries) {
                logger.warn(`✘ ${title}`);
                return { title, error: <Error>e };
            } else {
                logger.debug(`retrying '${title}'...`);
            }
        }
    }
    return { title, time: timeDiff(t0!, t1!) };
};

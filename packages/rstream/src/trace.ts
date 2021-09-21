import type { ISubscriber } from "./api";

/**
 * Helper {@link ISubscriber} for inspection / debugging purposes.
 * Simply logs received values to console, optionally with given
 * `prefix`.
 *
 * @param prefix -
 */
export const trace = (prefix?: any): ISubscriber<any> => ({
    next(x) {
        prefix ? console.log(prefix, x) : console.log(x);
    },
    done() {
        prefix ? console.log(prefix, "done") : console.log("done");
    },
    error(e) {
        prefix ? console.log(prefix, "error", e) : console.log("error", e);
        return false;
    },
});

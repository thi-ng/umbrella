import { ISubscriber } from "../api";

/**
 * Helper subscriber for inspection / debugging purposes. Simply logs
 * received values to console, optionally with given `prefix`.
 *
 * @param prefix
 */
export function trace(prefix?: any): ISubscriber<any> {
    return {
        next(x) {
            prefix ? console.log(prefix, x) : console.log(x);
        },
        done() {
            prefix ? console.log(prefix, "done") : console.log("done");
        },
        error(e) {
            prefix ? console.log(prefix, "error", e) : console.log("error", e);
        }
    }
}

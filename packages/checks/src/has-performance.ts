import { isFunction } from "./is-function";

export function hasPerformance() {
    return typeof performance !== 'undefined' && isFunction(performance.now);
}

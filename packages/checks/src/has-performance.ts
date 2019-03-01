import { isFunction } from "./is-function";

export const hasPerformance = () =>
    typeof performance !== "undefined" && isFunction(performance.now);

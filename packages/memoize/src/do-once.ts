import type { Fn } from "@thi.ng/api";
import type { MapLike } from "./api.js";

/**
 * Similar to {@link memoize1}, however optimized for side effects only, i.e.
 * functions which DO NOT return any result.
 *
 * @param fn - 
 * @param cache - 
 */
export const doOnce = <T>(fn: Fn<T, void>, cache?: MapLike<T, boolean>) => {
    !cache && (cache = new Map());
    return (x: T) => {
        if (!cache!.has(x)) {
            cache!.set(x, true);
            fn(x);
        }
    };
};

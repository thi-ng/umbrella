/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy). The function
 * is only enabled if `NODE_ENV != "production"` or if
 * `UMBRELLA_ASSERTS = 1`.
 */
export const assert =
    (process.env.NODE_ENV !== "production" ||
        process.env.UMBRELLA_ASSERTS === "1") ?
        (test: boolean | (() => boolean), msg = "assertion failed") => {
            if ((typeof test === "function" && !test()) || !test) {
                throw new Error(msg);
            }
        } :
        () => { };

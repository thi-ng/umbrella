import { defError } from "./deferror";

export const AssertionError = defError<any>(() => "Assertion failed");

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy).
 *
 * @remarks
 * The function is only enabled if `process.env.NODE_ENV != "production"`
 * or if the `UMBRELLA_ASSERTS` env var is set to 1.
 */
export const assert = (() => {
    try {
        return (
            process.env.NODE_ENV !== "production" ||
            process.env.UMBRELLA_ASSERTS === "1"
        );
    } catch (e) {}
    return false;
})()
    ? (test: boolean | (() => boolean), msg?: string | (() => string)) => {
          if ((typeof test === "function" && !test()) || !test) {
              throw new AssertionError(typeof msg === "function" ? msg() : msg);
          }
      }
    : () => {};

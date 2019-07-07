import { Fn0, NO_OP } from "./api";

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy). The function
 * is only enabled if `NODE_ENV != "production"` or if
 * `UMBRELLA_ASSERTS = 1`.
 */
export const assert =
    typeof process === "undefined" ||
    process.env.NODE_ENV !== "production" ||
    process.env.UMBRELLA_ASSERTS === "1"
        ? (
              test: boolean | Fn0<boolean>,
              msg: string | Fn0<string> = "assertion failed"
          ) => {
              if ((typeof test === "function" && !test()) || !test) {
                  throw new Error(typeof msg === "function" ? msg() : msg);
              }
          }
        : NO_OP;

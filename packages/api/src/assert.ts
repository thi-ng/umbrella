import { Fn0, NO_OP } from "./api/fn";

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy). The function
 * is only enabled if `process.env.NODE_ENV != "production"` or if the
 * `UMBRELLA_ASSERTS` env var is set to 1.
 */
export const assert =
    process?.env?.NODE_ENV !== "production" ||
    process?.env?.UMBRELLA_ASSERTS === "1"
        ? (
              test: boolean | Fn0<boolean>,
              msg: string | Fn0<string> = "assertion failed"
          ) => {
              if ((typeof test === "function" && !test()) || !test) {
                  throw new Error(typeof msg === "function" ? msg() : msg);
              }
          }
        : NO_OP;

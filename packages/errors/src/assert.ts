import { defError } from "./deferror.js";

export const AssertionError = defError<any>(() => "Assertion failed");

/**
 * Takes a `test` result or predicate function without args and throws error
 * with given `msg` if test failed (i.e. is falsy).
 *
 * @remarks
 * The function is only enabled if `process.env.NODE_ENV != "production"` or if
 * the `UMBRELLA_ASSERTS` or `VITE_UMBRELLA_ASSERTS` env var is set to 1.
 */
export const assert = (
	typeof process !== "undefined" && process.env !== undefined
		? process.env.NODE_ENV !== "production" ||
		  !!process.env.UMBRELLA_ASSERTS
		: (<any>import.meta).env
		? (<any>import.meta).env.MODE !== "production" ||
		  !!(<any>import.meta).env.VITE_UMBRELLA_ASSERTS
		: true
)
	? (test: boolean | (() => boolean), msg?: string | (() => string)) => {
			if ((typeof test === "function" && !test()) || !test) {
				throw new AssertionError(
					typeof msg === "function" ? msg() : msg
				);
			}
	  }
	: () => {};

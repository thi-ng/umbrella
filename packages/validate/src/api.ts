import type { Fn, Predicate } from "@thi.ng/api";

export interface Validator {
	/**
	 * Optional coercion function, applied as pre-processor for {@link Validator.valid}.
	 */
	coerce?: Fn<any, any>;
	/**
	 * Validation predicate. If the function returns false, the
	 * {@link volidator} wrapper will throw an error.
	 */
	valid: Predicate<any>;
	/**
	 * Optional error message (or function to produce such).
	 */
	msg?: string | Fn<any, string>;
}

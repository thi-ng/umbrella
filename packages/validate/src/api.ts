// SPDX-License-Identifier: Apache-2.0
import type { Fn, Predicate } from "@thi.ng/api";

export interface Validator {
	/**
	 * Optional coercion function, applied as pre-processor for {@link Validator.valid}.
	 */
	coerce?: Fn<any, any>;
	/**
	 * Validation predicate. If the function returns false, the
	 * {@link validator} wrapper will throw an error.
	 */
	valid: Predicate<any>;
	/**
	 * Optional error message (or function to produce such).
	 */
	msg?: ValidatorMsg;
}

export type ValidatorMsg = string | Fn<any, string>;

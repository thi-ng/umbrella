// SPDX-License-Identifier: Apache-2.0
export interface IEmpty<T> {
	/**
	 * Returns an empty/blank instance of same type (with possibly same
	 * config, if any).
	 */
	empty(): T;
}

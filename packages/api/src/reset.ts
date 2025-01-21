// SPDX-License-Identifier: Apache-2.0
/**
 * Interface for types supporting some form of internal state reset.
 */
export interface IReset {
	reset(): this;
}

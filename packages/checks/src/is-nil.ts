// SPDX-License-Identifier: Apache-2.0
/**
 * Checks if x is null or undefined.
 *
 */
export const isNil = (x: any): x is null | undefined => x == null;

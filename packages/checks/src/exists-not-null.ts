// SPDX-License-Identifier: Apache-2.0
export const existsAndNotNull = <T>(x: T | null | undefined): x is T =>
	x != null;

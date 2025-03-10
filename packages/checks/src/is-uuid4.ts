// SPDX-License-Identifier: Apache-2.0
const RE =
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isUUIDv4 = (x: string) => RE.test(x);

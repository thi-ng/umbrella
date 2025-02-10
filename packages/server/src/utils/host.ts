// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors";
import { HEX } from "@thi.ng/strings";

/**
 * Takes a hostname or IPv6 address `test` and compares it against `expected`,
 * returns true if matching.
 *
 * @remarks
 * If `test` is an IPv6 address in the format `[...]`, it will be compared
 * without surrounding square brackets. If `expected` is an IPv6 address it MUST
 * have been pre-normalized using {@link normalizeIPv6Address}. For performance
 * reasons only `test` will be automatically normalized, i.e. `::1` will be
 * normalized as `0:0:0:0:0:0:0:1`.
 *
 * @param test
 * @param expected
 *
 * @internal
 */
export const isMatchingHost = (test: string, expected: string) => {
	if (/^\[[0-9a-f:]{1,39}\]$/.test(test)) {
		try {
			return (
				normalizeIPv6Address(test.substring(1, test.length - 1)) ===
				expected
			);
		} catch (_) {
			return false;
		}
	}
	return test === expected;
};

/**
 * Parses given IPv6 address into an 8-tuple of 16bit uints. Throws error if
 * address is invalid.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/IPv6_address
 *
 * @param addr
 */
export const parseIPv6Address = (addr: string) => {
	if (addr == "::") return [0, 0, 0, 0, 0, 0, 0, 0];
	if (addr == "::1") return [0, 0, 0, 0, 0, 0, 0, 1];
	const n = addr.length - 1;
	if (n > 38) invalidIPv6(addr);
	const parts: number[] = [];
	let curr = 0;
	let zeroes = -1;
	for (let i = 0; i <= n; i++) {
		const ch = addr[i];
		if (i === n && ch == ":") illegalArgs(addr);
		if (i === n || ch === ":") {
			if (parts.length >= (zeroes >= 0 ? 6 : 8)) invalidIPv6(addr);
			const end = i === n ? n + 1 : i > curr ? i : invalidIPv6(addr);
			if (end - curr > 4) invalidIPv6(addr);
			parts.push(parseInt(addr.substring(curr, end), 16));
			if (addr[i + 1] === ":") {
				if (zeroes >= 0) invalidIPv6(addr);
				zeroes = parts.length;
				i++;
			}
			curr = i + 1;
		} else if (!HEX[ch]) invalidIPv6(addr);
	}
	if (zeroes >= 0) {
		parts.splice(zeroes, 0, ...new Array(8 - parts.length).fill(0));
	}
	if (parts.length !== 8) invalidIPv6(addr);
	return parts;
};

/**
 * Returns normalized version of given IPv6 address, i.e. expanding `::`
 * sections, removing leading zeroes and performing other syntactic validations.
 * The returned address always has 8 parts. Throws error if address is invalid.
 *
 * @remarks
 * Internally uses {@link parseIPv6Address}.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/IPv6_address
 *
 * @param addr
 */
export const normalizeIPv6Address = (addr: string) =>
	parseIPv6Address(addr)
		.map((x) => x.toString(16))
		.join(":");

const invalidIPv6 = (addr: string) =>
	illegalArgs("invalid IPv6 address: " + addr);

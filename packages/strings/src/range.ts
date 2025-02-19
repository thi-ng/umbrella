// SPDX-License-Identifier: Apache-2.0
/**
 * Yields iterator of characters in the closed `[from,to]` interval. Uses
 * reverse ordering if `to` < `from`.
 *
 * @param from -
 * @param to -
 */
export function* charRange(from: string | number, to: string | number) {
	let i = typeof from === "string" ? from.charCodeAt(0) : from;
	const end = typeof to === "string" ? to.charCodeAt(0) : to;
	if (i <= end) {
		for (; i <= end; i++) {
			yield String.fromCharCode(i);
		}
	} else {
		for (; i >= end; i--) {
			yield String.fromCharCode(i);
		}
	}
}

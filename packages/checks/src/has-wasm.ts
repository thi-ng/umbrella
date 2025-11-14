// SPDX-License-Identifier: Apache-2.0
export const hasWASM = () =>
	(typeof self !== "undefined" &&
		typeof self["WebAssembly"] !== "undefined") ||
	(typeof global !== "undefined" &&
		typeof global["WebAssembly"] !== "undefined");

// SPDX-License-Identifier: Apache-2.0
export const hasWASM = () =>
	(typeof window !== "undefined" &&
		typeof (<any>window)["WebAssembly"] !== "undefined") ||
	(typeof global !== "undefined" &&
		typeof (<any>global)["WebAssembly"] !== "undefined");

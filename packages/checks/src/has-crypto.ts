// SPDX-License-Identifier: Apache-2.0
export const hasCrypto = () =>
	(typeof self !== "undefined" && self["crypto"] !== undefined) ||
	(typeof global !== "undefined" && global["crypto"] !== undefined);

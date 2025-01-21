// SPDX-License-Identifier: Apache-2.0
export const hasCrypto = () =>
	typeof window !== "undefined" && window["crypto"] !== undefined;

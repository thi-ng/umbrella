// SPDX-License-Identifier: Apache-2.0
export const svg = (...body: any[]) => [
	"svg",
	{ viewBox: "0 0 32 32" },
	...body,
];

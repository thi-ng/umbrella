// SPDX-License-Identifier: Apache-2.0
export const svg = (...body: any[]) => [
	"svg",
	{ viewBox: "0 0 32 32" },
	...body,
];

export const circle = (cx: number, cy: number, r: number) => [
	"circle",
	{ cx, cy, r },
];

export const path = (d: string) => ["path", { d }];

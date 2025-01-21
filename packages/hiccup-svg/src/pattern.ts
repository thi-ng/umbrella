// SPDX-License-Identifier: Apache-2.0
import type { Attribs } from "./api.js";
import { fattribs } from "./format.js";

export const pattern = (attribs: Attribs, ...body: any[]): any[] => [
	"pattern",
	fattribs({ ...attribs }),
	...body,
];

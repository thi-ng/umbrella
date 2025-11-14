// SPDX-License-Identifier: Apache-2.0
import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { Ellipse } from "./api/ellipse.js";
import { __argsVV } from "./internal/args.js";

export function ellipse(pos: Vec, r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(attribs?: Attribs): Ellipse;
export function ellipse(...args: any[]) {
	return new Ellipse(...__argsVV(args));
}

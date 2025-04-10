// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { Attribs, IHiccupShape2 } from "../api.js";
import { __copyAttribs } from "../internal/copy.js";
import { Polygon } from "./polygon.js";

export class ComplexPolygon implements IHiccupShape2<ComplexPolygon> {
	readonly type = "complexpoly";
	readonly dim = 2;

	children: Polygon[];

	constructor(
		public boundary: Polygon = new Polygon(),
		children?: Iterable<Polygon>,
		public attribs?: Attribs
	) {
		this.children = children ? ensureArray(children) : [];
	}

	*[Symbol.iterator]() {
		yield this.boundary;
		yield* this.children;
	}

	addChild(poly: Polygon) {
		this.children.push(poly);
	}

	copy(): ComplexPolygon {
		return new ComplexPolygon(
			this.boundary.copy(),
			this.children.map((h) => h.copy()),
			__copyAttribs(this.attribs)
		);
	}

	copyTransformed(fn: Fn<Polygon, Polygon>) {
		return new ComplexPolygon(
			fn(this.boundary),
			this.children.map((child) => fn(child)),
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs): ComplexPolygon {
		return new ComplexPolygon(this.boundary, this.children, attribs);
	}

	toHiccup() {
		const segments: any[] = [];
		const $hiccupSegments = ({ points }: Polygon) => {
			if (!points.length) return;
			segments.push(["M", points[0]]);
			for (let i = 1, n = points.length; i < n; i++) {
				segments.push(["L", points[i]]);
			}
			segments.push(["z"]);
		};
		$hiccupSegments(this.boundary);
		for (let c of this.children) $hiccupSegments(c);
		return ["path", this.attribs, segments];
	}
}

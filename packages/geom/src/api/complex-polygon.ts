import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { __copyAttribs } from "../internal/copy.js";
import { Polygon } from "./polygon.js";

export class ComplexPolygon implements IHiccupShape {
	children: Polygon[];

	constructor(
		public boundary: Polygon = new Polygon(),
		children?: Iterable<Polygon>,
		public attribs?: Attribs
	) {
		this.children = children ? ensureArray(children) : [];
	}

	get type() {
		return "complexpoly";
	}

	addChild(poly: Polygon) {
		this.children.push(poly);
	}

	copy(): ComplexPolygon {
		return new ComplexPolygon(
			this.boundary.copy(),
			this.children.map((h) => h.copy()),
			__copyAttribs(this)
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
			segments.push(["Z"]);
		};
		$hiccupSegments(this.boundary);
		for (let c of this.children) $hiccupSegments(c);
		return ["path", this.attribs, segments];
	}
}

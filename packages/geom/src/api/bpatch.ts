import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec, VecPair } from "@thi.ng/vectors";
import { mixCubic } from "@thi.ng/vectors/mix-cubic";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

/**
 * nD Cubic bezier patch defined by array of 4x4 control points in this
 * order:
 *
 * ```text
 *           7   11
 *     3 +---+---+---+ 15 (UV = 1,1)
 *       |   |   |   |
 *     2 +---+---+---+ 14
 *       |   |   |   |
 *     1 +---+---+---+ 13
 *  v    |   |   |   |
 *  ^  0 +---+---+---+ 12
 *  |        4   8
 *  |
 *  +----> u
 * ```
 *
 * The class implements a `unmapPoint()` method to transform a 2D UV coordinate
 * into the worldspace position on the patch surface.
 *
 * The `toHiccup()` impl is only suitable for 2D patches.
 *
 * Ported from toxiclibs.
 *
 */
export class BPatch extends APC implements IHiccupShape {
	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 16);
	}

	get type() {
		return "bpatch";
	}

	copy(): BPatch {
		return <BPatch>__copyShape(BPatch, this);
	}

	withAttribs(attribs: Attribs): BPatch {
		return new BPatch(this.points, attribs);
	}

	edges() {
		const p = this.points;
		return [
			[0, 1],
			[1, 2],
			[2, 3],
			[0, 4],
			[1, 5],
			[2, 6],
			[3, 7],
			[4, 5],
			[5, 6],
			[6, 7],
			[4, 8],
			[5, 9],
			[6, 10],
			[7, 11],
			[8, 9],
			[9, 10],
			[10, 11],
			[8, 12],
			[9, 13],
			[10, 14],
			[11, 15],
			[12, 13],
			[13, 14],
			[14, 15],
		].map(([a, b]) => <VecPair>[p[a], p[b]]);
	}

	unmapPoint(uv: ReadonlyVec, out?: Vec) {
		const cp = this.points;
		const [u, v] = uv;
		return mixCubic(
			out || null,
			mixCubic([], cp[0], cp[4], cp[8], cp[12], v),
			mixCubic([], cp[1], cp[5], cp[9], cp[13], v),
			mixCubic([], cp[2], cp[6], cp[10], cp[14], v),
			mixCubic([], cp[3], cp[7], cp[11], cp[15], v),
			u
		);
	}

	toHiccup() {
		const attribs = this.attribs;
		const acc: any[] = ["g", { fill: "none", ...attribs }];
		if (attribs && attribs.res) {
			const res = attribs.res - 1;
			const delta = 1 / res;
			for (let u = 0; u <= res; u++) {
				const col = [];
				const row = [];
				const uu = u * delta;
				for (let v = 0; v <= res; v++) {
					const p = [uu, v * delta];
					col.push(this.unmapPoint(p));
					row.push(this.unmapPoint([p[1], p[0]]));
				}
				acc.push(["polyline", {}, col]);
				acc.push(["polyline", {}, row]);
			}
		} else {
			this.edges().forEach((l) => acc.push(["line", {}, ...l]));
		}
		return acc;
	}
}

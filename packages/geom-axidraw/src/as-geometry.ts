import type { DrawCommand } from "@thi.ng/axidraw";
import type { Attribs } from "@thi.ng/geom-api";
import { group } from "@thi.ng/geom/group";
import { points } from "@thi.ng/geom/points";
import { polyline } from "@thi.ng/geom/polyline";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { copy } from "@thi.ng/vectors/copy";

export interface AsGeometryOpts {
	/**
	 * If true (default), records all movements whilst pen is up (otherwise only
	 * whilst pen is down)
	 */
	rapids: boolean;
	/**
	 * If true (default), records all pen up/down positions.
	 */
	pen: boolean;
	/**
	 * Attributes for result groups/pointclouds.
	 */
	attribs: Partial<{
		paths: Attribs;
		rapids: Attribs;
		ups: Attribs;
		downs: Attribs;
	}>;
}

const DEFAULT_ATTRIBS = {
	paths: { stroke: "#000" },
	rapids: { stroke: "#0ff" },
	ups: { fill: "#0f0", stroke: "none" },
	downs: { fill: "#f00", stroke: "none" },
};

/**
 * Converts a sequence of
 * [DrawCommands](https://docs.thi.ng/umbrella/axidraw/types/DrawCommand.html)
 * into thi.ng/geom geometry. Returns an object of shapes. The conversion can be
 * controlled via given options.
 *
 * @remarks
 * The returned object contains groups & shapes which are being color coded by
 * default:
 *
 * - `paths`: a group of polylines for which pen is down (#000)
 * - `rapids`: a group of polylines for which pen is up (#0ff)
 * - `ups`: a point cloud of positions where pen is being lifted (#0f0)
 * - `downs`: a point cloud of positions where pen is being placed down (#f00)
 *
 * @param src
 * @param opts
 */
export const asGeometry = (
	src: Iterable<DrawCommand>,
	opts: Partial<AsGeometryOpts> = {}
) => {
	opts = {
		rapids: true,
		pen: true,
		...opts,
		attribs: { ...DEFAULT_ATTRIBS, ...opts.attribs },
	};
	const rapids = [];
	const paths = [];
	const downs = [];
	const ups = [];
	let penDown = false;
	let pts: ReadonlyVec[] | null = null;
	let currPos: ReadonlyVec = [0, 0];
	const $move = (newPos: ReadonlyVec) => {
		if (penDown || opts.rapids) {
			if (!pts) pts = [copy(currPos), newPos];
			else pts.push(newPos);
		}
		currPos = newPos;
	};
	for (let cmd of src) {
		switch (cmd[0]) {
			// absolute
			case "M":
				$move(copy(cmd[1]));
				break;
			// relative
			case "m":
				$move(add2([], currPos, cmd[1]));
				break;
			case "u":
				if (pts) {
					if (penDown) paths.push(pts);
					else if (opts.rapids) rapids.push(pts);
					pts = null;
				}
				if (opts.pen) ups.push(copy(currPos));
				penDown = false;
				break;
			case "d":
				if (pts) {
					if (!penDown) {
						if (opts.rapids) rapids.push(pts);
					} else paths.push(pts);
					pts = null;
				}
				if (opts.pen) downs.push(copy(currPos));
				penDown = true;
				break;
			case "home":
				currPos = [0, 0];
				if (!pts) pts = [currPos];
				else pts.push(currPos);
				break;
			default:
				console.log("skipping command", cmd);
		}
	}
	if (pts) {
		if (penDown) paths.push(pts);
		else rapids.push(pts);
	}
	return {
		paths: group(
			opts.attribs!.paths,
			paths.map((pts) => polyline(pts))
		),
		rapids: group(
			opts.attribs!.rapids,
			rapids.map((pts) => polyline(pts))
		),
		ups: points(ups, opts.attribs!.ups),
		downs: points(downs, opts.attribs!.downs),
	};
};

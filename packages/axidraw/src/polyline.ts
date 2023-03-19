import type { ReadonlyVec } from "@thi.ng/vectors";
import type { DrawCommand, PolylineOpts } from "./api.js";
import { DOWN, MOVE, PEN, UP } from "./commands.js";

/**
 * Takes an array of 2D points and yields an iterable of {@link DrawCommand}s.
 * The drawing behavior can be customized via additional {@link PolylineOpts}
 * given.
 *
 * @remarks
 * The resulting command sequence assumes the pen is in the **up** position at
 * the beginning of the line. Each polyline will end with a {@link UP} command.
 *
 * @param pts
 * @param opts
 */
export function* polyline(
	pts: ReadonlyVec[],
	opts: Partial<PolylineOpts>
): IterableIterator<DrawCommand> {
	if (!pts.length) return;
	const { speed, delayDown, delayUp, down, onlyGeo } = {
		speed: 1,
		onlyGeo: false,
		...opts,
	};
	if (onlyGeo) {
		for (let p of pts) yield MOVE(p, speed);
		return;
	}
	yield MOVE(pts[0]);
	if (down !== undefined) yield PEN(down);
	yield DOWN(delayDown);
	for (let i = 1, n = pts.length; i < n; i++) yield MOVE(pts[i], speed);
	yield UP(delayUp);
	// reset pen to configured defaults
	if (down !== undefined) yield PEN();
}

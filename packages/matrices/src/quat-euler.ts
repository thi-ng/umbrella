import { X3, Y3, Z3, type ReadonlyVec } from "@thi.ng/vectors/api";
import { mulQ } from "./mulq.js";
import { quatFromAxisAngle } from "./quat-axis-angle.js";

export type AxisOrder = "xyz" | "yxz" | "xzy" | "zxy" | "yzx" | "zyx";

/** @internal */
const AXIS_ORDER: Record<AxisOrder, ReadonlyVec[]> = {
	xyz: [X3, Y3, Z3],
	yxz: [Y3, X3, Z3],
	xzy: [X3, Z3, Y3],
	zxy: [Z3, X3, Y3],
	yzx: [Y3, Z3, X3],
	zyx: [Z3, Y3, X3],
};

/**
 * Constructs a quaternion from given rotation angles in specified
 * `order`.
 *
 * @param order -
 * @param a -
 * @param b -
 * @param c -
 */
export const quatFromEuler = (
	order: AxisOrder,
	a: number,
	b: number,
	c: number
) => {
	const [aa, ab, ac] = AXIS_ORDER[order];
	return mulQ(
		null,
		mulQ([], quatFromAxisAngle(aa, a), quatFromAxisAngle(ab, b)),
		quatFromAxisAngle(ac, c)
	);
};

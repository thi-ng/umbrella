import { setC } from "@thi.ng/vectors/setc";
import type { MatOpM } from "./api.js";

/**
 * Converts 2x3 to 4x4 matrix and writes result to `out`. Creates new
 * matrix if `out` is `null`.
 *
 * @param out -
 * @param m23 -
 */
export const mat23to44: MatOpM = (out, m23) =>
	setC(
		out || [],
		// x
		m23[0],
		m23[1],
		0,
		0,
		// y
		m23[2],
		m23[3],
		0,
		0,
		// z
		0,
		0,
		1,
		0,
		// w
		m23[4],
		m23[5],
		0,
		1
	);

import type { FnU5 } from "@thi.ng/api";
import type { Dual } from "@thi.ng/dual-algebra";
import { $, mul, sub } from "@thi.ng/dual-algebra/ops";
import { dot } from "@thi.ng/dual-algebra/vector";
import { asSvg, svgDoc } from "@thi.ng/geom/as-svg";
import { circle } from "@thi.ng/geom/circle";
import { cubic } from "@thi.ng/geom/cubic";
import { line } from "@thi.ng/geom/line";
import { text } from "@thi.ng/geom/text";
import { fract } from "@thi.ng/math/prec";
import { vector } from "@thi.ng/strings/vector";
import { add2 } from "@thi.ng/vectors/add";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { sub2 } from "@thi.ng/vectors/sub";

/**
 * Computes point at `t` (in [0..1] range) on given cubic curve using dual
 * numbers, i.e. it computes (jointly) both the position **AND** the first
 * derivative (aka tangent) at this point.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param t -
 */
const splinePosAndTangent: FnU5<number, Dual> = (a, b, c, d, _t) => {
	const t = $(_t, 1); // dual variable
	const s = sub($(1), t); // dual variable (1 - t)
	const s2 = mul(s, s); // squared
	const t2 = mul(t, t); // ...
	// dot product of 2 dual number vectors...
	// the real part of the result contains the position
	// the dual part the tangent
	return dot(
		// vector of coordinates (as dual numbers)
		[$(a), $(b), $(c), $(d)],
		// Bernstein spline coefficients (also dual numbers)
		// see: https://en.wikipedia.org/wiki/Bernstein_polynomial
		[mul(s, s2), mul(mul(s2, t), $(3)), mul(mul(t2, s), $(3)), mul(t, t2)]
	);
};

// curve definition
const a = [0, 10];
const b = [150, 10];
const c = [-50, 100];
const d = [100, 80];
const curve = cubic(a, b, c, d, { stroke: "red" });

let t = 0;

const root = document.getElementById("app")!;

setInterval(() => {
	t = fract(t + 0.001);

	const [x, dx] = splinePosAndTangent(a[0], b[0], c[0], d[0], t);
	const [y, dy] = splinePosAndTangent(a[1], b[1], c[1], d[1], t);

	const pos = [x, y];
	const dir = normalize2(null, [dx, dy], 20);

	root.innerHTML = asSvg(
		svgDoc(
			{
				width: 600,
				height: 600,
				viewBox: "0 0 100 100",
				fill: "none",
				"stroke-width": 0.2,
			},
			curve,
			circle(pos, 1, { stroke: "blue" }),
			line(sub2([], pos, dir), add2([], pos, dir), {
				stroke: "blue",
			}),
			text([5, 95], vector(2)(dir), {
				fill: "black",
				"font-size": "2px",
			})
		)
	);
}, 16);

import { EPS, TAU } from "@thi.ng/math/api";
import { abs2 } from "@thi.ng/vectors/abs";
import { angleBetween2 } from "@thi.ng/vectors/angle-between";
import { X2, type ReadonlyVec, type Vec } from "@thi.ng/vectors/api";
import { div2 } from "@thi.ng/vectors/div";
import { eqDelta2 } from "@thi.ng/vectors/eqdelta";
import { mulN2 } from "@thi.ng/vectors/muln";
import { neg } from "@thi.ng/vectors/neg";
import { powN2 } from "@thi.ng/vectors/pown";
import { sub2 } from "@thi.ng/vectors/sub";
import { submN2 } from "@thi.ng/vectors/submn";

/**
 * Conversion from endpoint to center parameterization.
 *
 * https://svgwg.org/svg2-draft/implnote.html#ArcConversionEndpointToCenter
 *
 * Returns undefined if `a` & `b` are equal or any `radii` component is zero.
 *
 * @param a - start point
 * @param b - end point
 * @param radii - ellipse radii
 * @param axis - in radians
 * @param xl - large arc flag
 * @param cw - clockwise flag
 */
export const fromEndPoints = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	radii: ReadonlyVec,
	axis = 0,
	xl = false,
	cw = false
) => {
	const r = abs2([], radii);
	if (eqDelta2(a, b) || r[0] < EPS || r[1] < EPS) {
		return;
	}
	axis %= TAU;
	const d = submN2([], a, b, 0.5);
	const c = Math.cos(axis);
	const s = Math.sin(axis);
	// transformed point
	const tp = [c * d[0] + s * d[1], -s * d[0] + c * d[1]];
	const [tx2, ty2] = powN2([], tp, 2);
	// ensure radii
	const rc = tx2 / (r[0] * r[0]) + ty2 / (r[1] * r[1]);
	rc > 1 && mulN2(r, r, Math.sqrt(rc));
	const [rx, ry] = r;
	const rx2 = rx * rx;
	const ry2 = ry * ry;
	// transformed center
	const radicant = Math.max(
		0,
		(rx2 * ry2 - rx2 * ty2 - ry2 * tx2) / (rx2 * ty2 + ry2 * tx2)
	);
	const coeff = (xl !== cw ? 1 : -1) * Math.sqrt(radicant);
	const tc = [coeff * ((rx * tp[1]) / ry), coeff * (-(ry * tp[0]) / rx)];
	// actual center
	const center: Vec = [
		c * tc[0] - s * tc[1] + (a[0] + b[0]) / 2,
		s * tc[0] + c * tc[1] + (a[1] + b[1]) / 2,
	];
	// transformed end points & angles
	const ta = div2(null, sub2([], tp, tc), r);
	const tb = div2(null, sub2(null, neg([], tp), tc), r);
	const start = angleBetween2(X2, ta);
	let sweep = angleBetween2(ta, tb);
	if (!cw && sweep > 0) {
		sweep -= TAU;
	} else if (cw && sweep < 0) {
		sweep += TAU;
	}
	sweep %= TAU;

	return {
		center,
		r,
		axis,
		start,
		end: start + sweep,
		xl,
		cw,
	};
};

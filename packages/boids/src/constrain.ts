import { wrapOnce } from "@thi.ng/math/interval";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { clamp2 as $clamp2, clamp3 as $clamp3 } from "@thi.ng/vectors/clamp";
import type { GlobalConstraint } from "./api.js";

export const clamp2 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p) =>
		$clamp2(p, p, min, max);

export const clamp3 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p) =>
		$clamp3(p, p, min, max);

export const wrap2 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p, boid) => {
		const [x, y] = p;
		let wrap = false;
		if (x < min[0] || x > max[0]) {
			p[0] = wrapOnce(x, min[0], max[0]);
			wrap = true;
		}
		if (y < min[1] || y > max[1]) {
			p[1] = wrapOnce(y, min[1], max[1]);
			wrap = true;
		}
		if (wrap) boid.pos.reset(p);
		return p;
	};

export const wrap3 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p, boid) => {
		let [x, y, z] = p;
		let wrap = false;
		if (x < min[0] || x > max[0]) {
			p[0] = wrapOnce(x, min[0], max[0]);
			wrap = true;
		}
		if (y < min[1] || y > max[1]) {
			p[1] = wrapOnce(y, min[1], max[1]);
			wrap = true;
		}
		if (z < min[2] || z > max[2]) {
			p[2] = wrapOnce(z, min[2], max[2]);
			wrap = true;
		}
		if (wrap) boid.pos.reset(p);
		return p;
	};

// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import {
	lookAt,
	mulQ,
	mulVQ,
	quatFromAxisAngle,
	type Mat,
} from "@thi.ng/matrices";
import {
	cross3,
	dot3,
	magSq3,
	neg3,
	normalize3,
	set,
	type Vec,
} from "@thi.ng/vectors";

export interface ArcBallOpts {
	/**
	 * Initial eye (camera view) distance.
	 */
	eyeDist: number;
	/**
	 * Initial normalized radius scale of the arcball. The smaller the radius
	 * the more sensitive the arc ball responds to drag gestures. The arcball
	 * radius is always based on the smallest side of the viewport configured
	 * initially (or via {@link ArcBall.resize}).
	 *
	 * @defaultValue 0.5
	 */
	radiusScale: number;
	/**
	 * Initial arc ball orientation (quaternion).
	 */
	initial: Vec;
}

/**
 * Factory function for {@link ArcBall}.
 *
 * @param w
 * @param h
 * @param opts
 */
export const defArcBall = (w: number, h: number, opts?: Partial<ArcBallOpts>) =>
	new ArcBall(w, h, opts);

/**
 * 3D arcball controller for intuitive click & drag gesture-based camera view
 * rotations. Quaternion-based.
 *
 * @remarks
 * Ported from:
 * https://github.com/thi-ng/geom/blob/feature/no-org/src/thi/ng/geom/gl/arcball.cljc
 *
 * Which itself is based on:
 *
 * "ARCBALL: A User Interface for Specifying Three-Dimensional Orientation Using
 * a Mouse" by Ken Shoemake
 * https://www.talisman.org/~erlkonig/misc/shoemake92-arcball.pdf
 */
export class ArcBall {
	center!: Vec;
	clickPos: Maybe<Vec>;
	currQ: Vec;
	clickQ!: Vec;
	viewMat!: Mat;
	radius!: number;
	radiusScale: number;
	eyeDist: number;

	constructor(
		w: number,
		h: number,
		{ eyeDist = 10, radiusScale = 0.5, initial }: Partial<ArcBallOpts> = {}
	) {
		this.eyeDist = eyeDist;
		this.radiusScale = radiusScale;
		this.resize(w, h);
		this.currQ = initial || quatFromAxisAngle([0, 0, 1], 0);
		this.update();
	}

	down(p: Vec) {
		this.clickPos = pointOnSphere(this.center, this.radius, p);
		this.clickQ = set([], this.currQ);
		this.update();
	}

	up() {
		this.clickPos = undefined;
	}

	drag(p: Vec) {
		if (this.clickPos) {
			const sp = pointOnSphere(this.center, this.radius, p);
			const axis = cross3([], this.clickPos, sp);
			this.currQ = mulQ(
				null,
				[axis[0], axis[1], axis[2], dot3(this.clickPos, sp)],
				this.clickQ
			);
			this.update();
		}
	}

	resize(w: number, h: number) {
		this.radius = Math.min(w, h) * this.radiusScale;
		this.center = [w / 2, h / 2];
	}

	setRadiusScale(scale: number) {
		this.radiusScale = scale;
		this.resize(this.center[0] * 2, this.center[1] * 2);
	}

	setEyeDistance(dist: number) {
		this.eyeDist = dist;
		return this.update();
	}

	update() {
		const c = this.currQ;
		const q = [c[0], c[1], c[2], -c[3]];
		const eye = neg3(null, mulVQ(null, q, [0, 0, this.eyeDist]));
		const up = mulVQ(null, q, [0, 1, 0]);
		return (this.viewMat = lookAt([], eye, [0, 0, 0], up));
	}
}

const pointOnSphere = (o: Vec, r: number, p: Vec): Vec => {
	const v = [(p[0] - o[0]) / r, (p[1] - o[1]) / r, 0];
	const m = magSq3(v);
	if (m > 1) {
		normalize3(v, v);
	} else {
		v[2] = Math.sqrt(1 - m);
	}
	return v;
};

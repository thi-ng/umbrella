// SPDX-License-Identifier: Apache-2.0
import type { Attribs } from "./api.js";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dot3 } from "@thi.ng/vectors/dot";
import { normalize3 } from "@thi.ng/vectors/normalize";
import { orthoNormal3 } from "@thi.ng/vectors/ortho-normal";
import { set3 } from "@thi.ng/vectors/set";
import { Plane } from "./api/plane.js";
import type { Ray3 } from "./api/ray3.js";

export const plane = (normal: Vec, w: number, attribs?: Attribs) =>
	new Plane(normalize3(null, normal), w, attribs);

export const planeWithPoint = (
	normal: Vec,
	p: ReadonlyVec,
	attribs?: Attribs
) => {
	normal = normalize3(null, normal);
	return new Plane(normal, dot3(normal, p), attribs);
};

/**
 * Creates a new plane from the given ray, using the ray's position as point on
 * the plane and the ray's direction as plane normal. If `attribs` are given,
 * they take precedence over the ray's attribs.
 *
 * @param ray
 * @param attribs
 */
export const planeFromRay = ({ pos, dir, attribs }: Ray3, $attribs?: Attribs) =>
	new Plane(set3([], dir), dot3(dir, pos), $attribs || attribs);

export const planeFrom3Points = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	attribs?: Attribs
) => planeWithPoint(orthoNormal3([], a, b, c), a, attribs);

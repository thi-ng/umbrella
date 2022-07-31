import type { Attribs } from "@thi.ng/geom-api";
import { circumCenter2 } from "@thi.ng/geom-poly-utils/circumcenter";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dist } from "@thi.ng/vectors/dist";
import { mixN2 } from "@thi.ng/vectors/mixn";
import { Circle } from "./api/circle.js";
import { __argsVN } from "./internal/args.js";

export function circle(pos: Vec, r: number, attribs?: Attribs): Circle;
export function circle(pos: Vec, attribs?: Attribs): Circle;
export function circle(r: number, attribs?: Attribs): Circle;
export function circle(attribs?: Attribs): Circle;
export function circle(...args: any[]) {
	return new Circle(...__argsVN(args));
}

export const circleFrom2Points = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	attribs?: Attribs
) => new Circle(mixN2([], a, b, 0.5), dist(a, b) / 2, attribs);

export const circleFrom3Points = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	attribs?: Attribs
) => {
	const o = circumCenter2(a, b, c);
	return o ? new Circle(o, dist(a, o), attribs) : undefined;
};

import {
    dist,
    mixN2,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors";
import { Attribs, Circle } from "../api";
import { argsVN } from "../internal/args";
import { circumCenter } from "../internal/circumcenter";

export function circle(pos: Vec, r: number, attribs?: Attribs): Circle;
export function circle(pos: Vec, attribs?: Attribs): Circle;
export function circle(r: number, attribs?: Attribs): Circle;
export function circle(attribs?: Attribs): Circle;
export function circle(...args: any[]) {
    return new Circle(...argsVN(args));
}

export const circleFrom2Points =
    (a: ReadonlyVec, b: ReadonlyVec, attribs?: Attribs) =>
        new Circle(mixN2([], a, b, 0.5), dist(a, b) / 2, attribs);

export const circleFrom3Points =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, attribs?: Attribs) => {
        const o = circumCenter(a, b, c);
        return o ? new Circle(o, dist(a, o), attribs) : undefined;
    };

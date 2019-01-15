import { TAU } from "@thi.ng/math";
import {
    cycle,
    map,
    normRange,
    push,
    transduce,
    tuples
} from "@thi.ng/transducers";
import { cartesian2, Vec } from "@thi.ng/vectors3";
import { Attribs, Polygon } from "../api";

export const polygon =
    (pts: Vec[], attribs?: Attribs) =>
        new Polygon(pts, attribs);

export const star =
    (r: number, n: number, profile: number[], attribs?: Attribs) =>
        new Polygon(
            transduce(
                map(([i, p]) => cartesian2(null, [r * p, i * TAU])),
                push(),
                tuples(normRange(n * profile.length, false), cycle(profile))
            ),
            attribs
        );

import type { Attribs } from "@thi.ng/geom-api";
import { TAU } from "@thi.ng/math/api";
import { cycle } from "@thi.ng/transducers/cycle";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { zip } from "@thi.ng/transducers/zip";
import type { Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { Polygon } from "../api/polygon";

export const polygon = (pts: Vec[], attribs?: Attribs) =>
    new Polygon(pts, attribs);

export const star = (
    r: number,
    n: number,
    profile: number[],
    attribs?: Attribs
) =>
    new Polygon(
        transduce(
            map(([i, p]) => cartesian2(null, [r * p, i * TAU])),
            push(),
            zip(normRange(n * profile.length, false), cycle(profile))
        ),
        attribs
    );

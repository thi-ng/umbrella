import type { Fn3 } from "@thi.ng/api";
import { mergeDeepObj } from "@thi.ng/associative/merge-deep";
import type { IHiccupShape } from "@thi.ng/geom-api";
import { resample } from "@thi.ng/geom-resample/resample";
import { line } from "@thi.ng/geom/ctors/line";
import { polyline } from "@thi.ng/geom/ctors/polyline";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { jitter } from "@thi.ng/vectors/jitter";
import { DEFAULT_LINE, FuzzyLineOpts } from "./api";
import { jitterPoints } from "./points";

export const defLine = (
    opts: Partial<FuzzyLineOpts> = {}
): Fn3<ReadonlyVec, ReadonlyVec, boolean, IHiccupShape> => {
    opts = mergeDeepObj(DEFAULT_LINE, opts);
    return opts.resample! > 1
        ? (a, b, useAttr = true) =>
              polyline(
                  jitterPoints(
                      resample([a, b], { num: opts.resample, last: true }),
                      opts.jitter
                  ),
                  useAttr ? opts.attribs : undefined
              )
        : (a, b, useAttr = true) =>
              line(
                  jitter(null, a, opts.jitter),
                  jitter(null, b, opts.jitter),
                  useAttr ? opts.attribs : undefined
              );
};

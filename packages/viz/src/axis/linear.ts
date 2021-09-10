import { mergeDeepObj } from "@thi.ng/associative/merge-deep";
import { fit } from "@thi.ng/math/fit";
import { inRange } from "@thi.ng/math/interval";
import { roundTo } from "@thi.ng/math/prec";
import { range } from "@thi.ng/transducers/iter/range";
import { filter } from "@thi.ng/transducers/xform/filter";
import type { AxisSpec, Domain, InitialAxisSpec, Range, ScaleFn } from "../api";
import { axisDefaults } from "./common";

export const linearScale =
    ([d1, d2]: Domain, [r1, r2]: Range): ScaleFn =>
    (x) =>
        fit(x, d1, d2, r1, r2);

export const linearAxis = (src: InitialAxisSpec) => {
    const spec = <AxisSpec>mergeDeepObj(axisDefaults(), src);
    !spec.scale && (spec.scale = linearScale(spec.domain, spec.range));
    return spec;
};

export const linearTicks =
    (step: number) =>
    ([d1, d2]: Domain) =>
        [
            ...filter(
                (x) => inRange(x, d1, d2),
                range(roundTo(d1, step), d2 + step, step)
            ),
        ];

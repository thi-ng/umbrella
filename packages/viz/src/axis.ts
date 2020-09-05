import { mergeDeepObj } from "@thi.ng/associative";
import { inRange, roundTo } from "@thi.ng/math";
import { float } from "@thi.ng/strings";
import { filter, range } from "@thi.ng/transducers";
import type { AxisSpec, Domain } from "./api";
import { lensScale, linearScale } from "./scale";

const NO_TICKS = () => [];

const axisDefaults = (): Partial<AxisSpec> => ({
    attribs: { stroke: "#000" },
    label: (pos, body) => ["text", {}, pos, body],
    labelAttribs: {
        fill: "#000",
        stroke: "none",
    },
    labelOffset: [0, 0],
    format: float(2),
    visible: true,
    major: { ticks: NO_TICKS, size: 10 },
    minor: { ticks: NO_TICKS, size: 5 },
});

export const linTickMarks = (step: number) => ([d1, d2]: Domain) => [
    ...filter(
        (x) => inRange(x, d1, d2),
        range(roundTo(d1, step), d2 + step, step)
    ),
];

type InitialAxisSpec = Partial<AxisSpec> &
    Pick<AxisSpec, "domain" | "range" | "pos">;

export const linearAxis = (src: InitialAxisSpec) => {
    const spec = <AxisSpec>mergeDeepObj(axisDefaults(), src);
    !spec.scale && (spec.scale = linearScale(spec.domain, spec.range));
    return spec;
};

export const lensAxis = (
    src: InitialAxisSpec & { focus: number; strength: number }
): AxisSpec => {
    const spec = mergeDeepObj(axisDefaults(), src);
    !spec.scale &&
        (spec.scale = lensScale(
            spec.domain,
            spec.range,
            spec.focus,
            spec.strength
        ));
    return spec;
};

import { mergeDeepObj } from "@thi.ng/associative";
import { inRange, roundTo } from "@thi.ng/math";
import { float } from "@thi.ng/strings";
import { filter, range } from "@thi.ng/transducers";
import { AxisSpec, Domain } from "./api";
import { linearScale } from "./scale";

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

export const linTickMarks = (step = 1) => ([d1, d2]: Domain) => [
    ...filter(
        (x) => inRange(x, d1, d2),
        range(roundTo(d1, step), d2 + step, step)
    ),
];

export const linearAxis = (
    src: Partial<AxisSpec> & Pick<AxisSpec, "domain" | "range" | "pos">
) => {
    const spec = <AxisSpec>mergeDeepObj(axisDefaults(), src);
    !spec.scale && (spec.scale = linearScale(spec.domain, spec.range));
    return spec;
};

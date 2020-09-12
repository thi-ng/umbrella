import type { Fn } from "@thi.ng/api";
import { eqDelta } from "@thi.ng/math";
import { comp, filter, iterator, mapcat } from "@thi.ng/transducers";
import type { AxisSpec, VizSpec } from "./api";

const axisCommon = (
    { domain, major, minor, attribs, labelAttribs }: AxisSpec,
    axis: any,
    majorTickFn: Fn<number, any>,
    minorTickFn: Fn<number, any>,
    labelFn: Fn<number, any>
) => {
    const majorTicks = [...major.ticks!(domain)];
    return [
        "g",
        attribs,
        axis,
        ["path", {}, [...mapcat(majorTickFn, majorTicks)]],
        [
            "path",
            {},
            [
                ...iterator(
                    comp(
                        filter(
                            (x) =>
                                majorTicks.find((y) => eqDelta(x, y)) ===
                                undefined
                        ),
                        mapcat(minorTickFn)
                    ),
                    minor.ticks!(domain)
                ),
            ],
        ],
        ["g", { stroke: "none", ...labelAttribs }, ...majorTicks.map(labelFn)],
    ];
};

export const cartesianAxisX = (spec: AxisSpec) => {
    const {
        pos,
        scale,
        format,
        label,
        labelOffset: [lx, ly],
        range: [r1, r2],
    } = spec;
    const tick = (dy: number) => (x: number) => [
        ["M", [scale(x), pos]],
        ["v", dy],
    ];
    return axisCommon(
        spec,
        [
            "path",
            {},
            [
                ["M", [r1, pos]],
                ["L", [r2, pos]],
            ],
        ],
        tick(spec.major.size!),
        tick(spec.minor.size!),
        (x) => label([scale(x) + lx, pos + ly], format(x))
    );
};

export const cartesianAxisY = (spec: AxisSpec) => {
    const {
        pos,
        scale,
        format,
        label,
        labelOffset: [lx, ly],
        range: [r1, r2],
    } = spec;
    const tick = (dx: number) => (y: number) => [
        ["M", [pos, scale(y)]],
        ["h", dx],
    ];
    return axisCommon(
        spec,
        [
            "path",
            {},
            [
                ["M", [pos, r1]],
                ["L", [pos, r2]],
            ],
        ],
        tick(-spec.major.size!),
        tick(-spec.minor.size!),
        (y) => label([pos + lx, scale(y) + ly], format(y))
    );
};

const DEFAULT_ATTRIBS: any = {
    "font-family": "Arial, Helvetica, sans-serif",
    "font-size": "10px",
};

export const plotCartesian = (spec: VizSpec) => {
    const { xaxis, yaxis, plots } = spec;
    return [
        "g",
        { ...DEFAULT_ATTRIBS, ...spec.attribs },
        ...plots.map((fn) => fn(spec)),
        xaxis.visible ? cartesianAxisX(xaxis) : null,
        yaxis.visible ? cartesianAxisY(yaxis) : null,
    ];
};

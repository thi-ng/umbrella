import type { Fn } from "@thi.ng/api";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { comp } from "@thi.ng/transducers/comp";
import { iterator } from "@thi.ng/transducers/iterator";
import { filter } from "@thi.ng/transducers/filter";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { AxisSpec, VizSpec } from "./api";

const gridAxis = (
    { domain, major, minor }: AxisSpec,
    majorTickFn: Fn<number, any>,
    minorTickFn: Fn<number, any>
): any[] => {
    const majorTicks = [...major.ticks!(domain)];
    return [
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
    ];
};

const NONE = () => null;

const gridCartesian = ({ xaxis, yaxis, grid }: VizSpec) => {
    grid = {
        attribs: { stroke: [0, 0, 0, 0.2], "stroke-dasharray": "1 1" },
        xmajor: true,
        xminor: true,
        ymajor: true,
        yminor: true,
        ...grid,
    };
    const [x1, x2] = xaxis.range;
    const [y1, y2] = yaxis.range;
    const lineX = (x: number) => [
        ["M", [xaxis.scale(x), y1]],
        ["V", y2],
    ];
    const lineY = (x: number) => [
        ["M", [x1, yaxis.scale(x)]],
        ["H", x2],
    ];
    return [
        "g",
        grid.attribs,
        ...gridAxis(
            xaxis,
            grid.xmajor ? lineX : NONE,
            grid.xminor ? lineX : NONE
        ),
        ...gridAxis(
            yaxis,
            grid.ymajor ? lineY : NONE,
            grid.yminor ? lineY : NONE
        ),
    ];
};

const axisCommon = (
    spec: AxisSpec,
    axis: any,
    majorTickFn: Fn<number, any>,
    minorTickFn: Fn<number, any>,
    labelFn: Fn<number, any>
) => {
    const majorTicks = [...spec.major.ticks!(spec.domain)];
    return [
        "g",
        spec.attribs,
        axis,
        ...gridAxis(spec, majorTickFn, minorTickFn),
        [
            "g",
            { stroke: "none", ...spec.labelAttribs },
            ...majorTicks.map(labelFn),
        ],
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
    const tick = (dy: number) => (x: number) =>
        [
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
    const tick = (dx: number) => (y: number) =>
        [
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
        spec.grid ? gridCartesian(spec) : null,
        ...plots.map((fn) => fn(spec)),
        xaxis.visible ? cartesianAxisX(xaxis) : null,
        yaxis.visible ? cartesianAxisY(yaxis) : null,
    ];
};

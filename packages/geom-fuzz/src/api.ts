import type { Fn } from "@thi.ng/api";
import type { IColor } from "@thi.ng/color";
import type { Polygon } from "@thi.ng/geom";
import type { IHiccupShape } from "@thi.ng/geom-api";

export type Color = string | number[] | IColor;

export type FillFn = Fn<Polygon, IHiccupShape>;

export type HatchDir = "d" | "h" | "v";

export interface FuzzyPolygonOpts {
    num: number;
    jitter: number;
    curveBreakPoints: boolean;
    curveScale: number;
    fill: FillFn;
}

export interface FuzzyLineOpts {
    jitter: number;
    resample: number;
    attribs: any;
}

export interface HatchOpts {
    dir: HatchDir;
    space: number;
    line: Partial<FuzzyLineOpts>;
}

export interface DotFillOpts {
    space: number;
    jitter: number;
    attribs: Partial<{
        shape: "circle" | "square";
        [id: string]: any;
    }>;
}

export const DEFAULT_LINE = {
    resample: 0,
    jitter: 2,
    attribs: {
        lineCap: "butt",
        lineJoin: "round",
        stroke: "black",
    },
};

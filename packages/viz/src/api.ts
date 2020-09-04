import type { Fn, Fn2 } from "@thi.ng/api";

export type Domain = number[];
export type Range = number[];

export type ScaleFn = Fn<number, number>;

export type PlotFn = Fn<VizSpec, any>;

export interface AxisSpec {
    scale: ScaleFn;
    domain: Domain;
    range: Range;
    pos: number;
    visible: boolean;
    attribs: any;
    labelAttribs: any;
    label: Fn2<number[], string, any>;
    labelOffset: number[];
    format: Fn<number, string>;
    major: Partial<TickSpec>;
    minor: Partial<TickSpec>;
}

export interface TickSpec {
    ticks: Fn<Domain, Iterable<number>>;
    size: number;
}

export interface VizSpec {
    attribs?: any;
    xaxis: AxisSpec;
    yaxis: AxisSpec;
    project?: Fn<number[], number[]>;
    plots: PlotFn[];
}

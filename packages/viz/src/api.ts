import type { Fn, Fn2, FnN, FnU } from "@thi.ng/api";

export type Domain = number[];
export type Range = number[];

export type DomainValueFn<T = number> = Fn<Domain, Iterable<[number, T]>>;
export type DomainValues<T = number> = Iterable<[number, T]> | DomainValueFn<T>;

export type ScaleFn = FnN;

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

export type InitialAxisSpec = Partial<AxisSpec> &
	Pick<AxisSpec, "domain" | "range" | "pos">;

export interface TickSpec {
	ticks: Fn<Domain, Iterable<number>>;
	size: number;
}

export interface VizSpec {
	attribs?: any;
	xaxis: AxisSpec;
	yaxis: AxisSpec;
	project?: FnU<number[]>;
	plots: PlotFn[];
	grid?: Partial<GridSpec>;
}

export interface GridSpec {
	attribs: any;
	xmajor: boolean;
	xminor: boolean;
	ymajor: boolean;
	yminor: boolean;
}

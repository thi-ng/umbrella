import type { Fn, IObjectOf, Keys, Range0_3 } from "@thi.ng/api";
import {
	extractSegmentsX,
	extractSegmentsY,
	type TraceDir,
	type TraceDirImpl,
	type TraceOpts,
} from "@thi.ng/geom-trace-bitmap";
import {
	columns2d,
	diagonal2d,
	diagonalSlopeX,
	diagonalSlopeY,
	flipX,
	isOnDiagonal,
	isOnDiagonalAlt,
	rows2d,
	type GridIterOpts2D,
} from "@thi.ng/grid-iterators";
import { IntBuffer } from "@thi.ng/pixel";
import {
	ATKINSON,
	BURKES,
	FLOYD_STEINBERG,
	JARVIS_JUDICE_NINKE,
	SIERRA2,
	STUCKI,
	ditherWith,
	orderedDither,
} from "@thi.ng/pixel-dither";
import { resolve } from "@thi.ng/resolve-map";
import { type ISubscription, type KeyStreams } from "@thi.ng/rstream";
import {
	DIN_A3,
	DIN_A3_LANDSCAPE,
	DIN_A4,
	DIN_A4_LANDSCAPE,
	DIN_A5,
	DIN_A5_LANDSCAPE,
	DIN_A6,
	DIN_A6_LANDSCAPE,
} from "@thi.ng/units";

export interface AppState {
	layers: IObjectOf<Layer>;
	order: string[];
	img: ImageControls;
	canvas: {
		bg: string;
		size: number[];
		translate: number[];
		clickPos?: number[];
		scale: number;
	};
	preset: Keys<typeof PRESETS>;
	axi: AxiDrawConfig;
}

export interface ImageControls {
	buf?: IntBuffer;
	dither: DitherMode;
	scale: number;
	rotate: Range0_3;
	gamma: number;
	low: number;
	high: number;
}

export type ImageParam = Keys<ImageControls>;

export interface Layer {
	proc: ISubscription<LayerParams, LayerParams>;
	id: string;
	ctrls: LayerControls;
	params: LayerParams;
}

export interface LayerParams {
	color: string;
	mode: TraceMode;
	min: number;
	max: number;
	slope: number;
	skip: number;
}

export type LayerParam = Keys<LayerParams>;
export type LayerControls = KeyStreams<LayerParams, LayerParam>;

export interface AxiDrawConfig {
	paperSize: PaperSize;
	/**
	 * Num points before refilling brush
	 */
	maxPoints: number;
	/**
	 * Max distance (arc length) before refilling brush (when drawing lines)
	 */
	maxDist: number;
}

export interface Preset {
	bg: string;
	dither: DitherMode;
	layers: LayerParams[];
}

export interface TraceConfig {
	label: string;
	dir: TraceDir | Fn<number, TraceDirImpl>;
	select: Fn<number, TraceOpts["select"]>;
	extract?: typeof extractSegmentsX;
	slope?: boolean;
	skip?: boolean;
	points?: boolean;
}

const SELECT = (v: number) => v < 128;

export const TRACE_MODES = {
	h: <TraceConfig>{
		label: "→ horizontal",
		skip: true,
		dir: () => ({ order: rows2d }),
		select: (skip) =>
			skip > 0 ? (v, p) => v < 128 && p[1] % skip === 0 : SELECT,
	},
	v: <TraceConfig>{
		label: "↓ vertical",
		skip: true,
		dir: () => ({ order: columns2d }),
		select: (skip) =>
			skip > 0 ? (v, p) => v < 128 && p[0] % skip === 0 : SELECT,
	},
	d: <TraceConfig>{
		label: "↙ diagonal",
		skip: true,
		dir: () => ({ order: diagonal2d }),
		select: (skip) =>
			skip > 0 ? (v, p) => v < 128 && isOnDiagonal(p, skip) : SELECT,
	},
	dalt: <TraceConfig>{
		label: "↘ diagonal",
		skip: true,
		dir: () => ({ order: diagonal2d, tx: flipX }),
		select: (skip) =>
			skip > 0 ? (v, p) => v < 128 && isOnDiagonalAlt(p, skip) : SELECT,
	},
	dx: <TraceConfig>{
		label: "↙ diag x (w/ slope)",
		slope: true,
		dir: (slope: number) => ({
			order: (opts: GridIterOpts2D) => diagonalSlopeX({ ...opts, slope }),
		}),
		select: () => SELECT,
	},
	dy: <TraceConfig>{
		label: "↙ diag y (w/ slope)",
		slope: true,
		dir: (slope: number) => ({
			order: (opts: GridIterOpts2D) => diagonalSlopeY({ ...opts, slope }),
		}),
		select: () => SELECT,
	},
	px: <TraceConfig>{
		label: "· points x",
		points: true,
		skip: true,
		dir: "p",
		select: (skip) =>
			skip > 0 ? (v, p) => v < 128 && p[1] % skip === 0 : SELECT,
		extract: extractSegmentsX,
	},
	py: <TraceConfig>{
		label: "· points y",
		points: true,
		skip: true,
		dir: "p",
		select: (skip) =>
			skip > 0 ? (v, p) => v < 128 && p[0] % skip === 0 : SELECT,
		extract: extractSegmentsY,
	},
};

export const TRACE_MODE_ORDER: TraceMode[] = [
	"d",
	"dalt",
	"dx",
	"dy",
	"h",
	"v",
	"px",
	"py",
];

export type TraceMode = Keys<typeof TRACE_MODES>;

export const DITHER_MODES = {
	None: (img: IntBuffer) => img,
	Atkinson: (img: IntBuffer) => ditherWith(ATKINSON, img),
	"Bayer 2": (img: IntBuffer) => orderedDither(img, 2, 2),
	"Bayer 4": (img: IntBuffer) => orderedDither(img, 4, 2),
	"Bayer 8": (img: IntBuffer) => orderedDither(img, 8, 2),
	Burkes: (img: IntBuffer) => ditherWith(BURKES, img),
	"Floyd-Steinberg": (img: IntBuffer) => ditherWith(FLOYD_STEINBERG, img),
	"Jarvis-Judice-Ninke": (img: IntBuffer) =>
		ditherWith(JARVIS_JUDICE_NINKE, img),
	Sierra: (img: IntBuffer) => ditherWith(SIERRA2, img),
	Stucki: (img: IntBuffer) => ditherWith(STUCKI, img),
};

export type DitherMode = Keys<typeof DITHER_MODES>;

export const PRESETS = {
	Custom: <Preset>{},
	"B&W, vert/horiz": <Preset>{
		bg: "#e0e0e0",
		dither: "None",
		layers: [
			{
				color: "#000000",
				mode: "v",
				min: 2,
				max: 1000,
				skip: 0,
				slope: 1,
			},
			{
				color: "#000000",
				mode: "h",
				min: 2,
				max: 1000,
				skip: 0,
				slope: 1,
			},
		],
	},
	"RBY, Bayer8": <Preset>{
		bg: "#e4e0e0",
		dither: "Bayer 8",
		layers: [
			{
				color: "#ff1800",
				mode: "d",
				min: 2,
				max: 1000,
				skip: 1,
				slope: 1,
			},
			{
				color: "#220088",
				mode: "dalt",
				min: 2,
				max: 1000,
				skip: 0,
				slope: 1,
			},
			{
				mode: "px",
				min: 0,
				max: 0,
				slope: 1,
				skip: 1,
				color: "#ffd91a",
			},
		],
	},
	"CMYW, Gray BG": <Preset>{
		bg: "#666666",
		dither: "None",
		layers: [
			{
				mode: "d",
				min: 8,
				max: 1000,
				slope: 1,
				skip: 1,
				color: "#00eeff",
			},
			{
				mode: "dalt",
				min: 2,
				max: 1000,
				slope: 1,
				skip: 1,
				color: "#ff61ff",
			},
			{
				mode: "h",
				min: 2,
				max: 1000,
				slope: 1,
				skip: 0,
				color: "#ffdd00",
			},
			{
				mode: "py",
				min: 0,
				max: 2,
				slope: 1,
				skip: 1,
				color: "#ffffff",
			},
		],
	},
	"Points only, Atkinson": <Preset>{
		bg: "#e0e0e0",
		dither: "Atkinson",
		layers: [
			{ mode: "py", min: 0, max: 0, slope: 1, skip: 0, color: "#0000ff" },
		],
	},
};

export type PresetID = Keys<typeof PRESETS>;

export const PAPER_SIZES = {
	DIN_A3,
	DIN_A3_LANDSCAPE,
	DIN_A4,
	DIN_A4_LANDSCAPE,
	DIN_A5,
	DIN_A5_LANDSCAPE,
	DIN_A6,
	DIN_A6_LANDSCAPE,
};

export type PaperSize = Keys<typeof PAPER_SIZES>;

export interface Theme {
	geom: {
		psize: number;
	};
	button: {
		base: string;
		large: string;
		small: string;
		col2: string;
		col4: string;
	};
	fileButton: IObjectOf<{ root: string; button: string }>;
	sideBar: {
		root: string;
		title: string;
		section: string;
		layerParam: string;
		imageParam: string;
		control: string;
		col2: string;
		col4: string;
	};
	overlays: {
		stats: string;
	};
	root: string;
}

export const THEME = resolve<Theme>({
	root: "vh-100 flex f7",
	button: {
		base: "dib h2 b--black bg-dark-gray white",
		large: ({ base }: Theme["button"]) => base + " w-100",
		small: ({ base }: Theme["button"]) => base + " w-50",
		col2: "@/sideBar/col2",
		col4: "@/sideBar/col4",
	},
	fileButton: {
		large: {
			root: "relative overflow-hidden",
			button: "@/button/large",
		},
		small: {
			root: "w-50 relative overflow-hidden",
			button: "@/button/large",
		},
	},
	sideBar: {
		root: "w5 bg-near-black vh-100 overflow-y-scroll",
		title: "ma2 white",
		section: "bg-gray white bb b--dark-gray pa2",
		control: "db w-100 mb1",
		layerParam: "dib w-25 mb1",
		imageParam: "@layerParam",
		col2: "w-50",
		col4: "w-25",
	},
	overlays: {
		stats: "fixed z1 bottom-0 right-0 ma3 pa2 bg-black-60 white",
	},
	geom: {
		psize: 1.41,
	},
});

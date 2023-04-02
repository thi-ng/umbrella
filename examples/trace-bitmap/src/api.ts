import type { Fn, IObjectOf, Keys } from "@thi.ng/api";
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
}

export interface ImageControls {
	buf?: IntBuffer;
	dither: DitherMode;
	scale: number;
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

export interface Preset {
	version: number;
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

export interface Theme {
	button: {
		base: string;
		large: string;
		small: string;
	};
	fileButton: IObjectOf<{ root: string; button: string }>;
	sideBar: {
		root: string;
		section: string;
		layerParam: string;
		imageParam: string;
		control: string;
	};
}

export const THEME = resolve<Theme>({
	button: {
		base: "dib h2 b--black bg-dark-gray white",
		large: ({ base }: Theme["button"]) => base + " w-100",
		small: ({ base }: Theme["button"]) => base + " w-50",
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
		section: "bg-gray white bb b--dark-gray pa2",
		control: "db w-100 mb1",
		layerParam: "dib w-25 mb1",
		imageParam: "@layerParam",
	},
});

import type { FnN, NumOrString } from "@thi.ng/api";

export enum Align {
	LEFT,
	RIGHT,
	CENTER,
}

export enum Border {
	NONE = 0,
	H = 1,
	V = 2,
	ALL = 3,
	FRAME = 4,
	FRAME_H = 5,
	FRAME_V = 6,
}

export interface TableOpts {
	cols: { width: number /* align?: Align*/ }[];
	style?: StrokeStyle;
	format?: number;
	formatHead?: number;
	border?: Border;
	padding?: number[];
	hard?: boolean;
}

export interface TextBoxOpts {
	format: number;
	padding: number[];
	style: StrokeStyle;
	hard?: boolean;
}

export interface ImageOpts {
	/**
	 * Target characters in order of increasing brightness (assuming
	 * white text on black bg).
	 *
	 * @defaultValue {@link SHADES_BLOCK}
	 */
	chars: string | NumOrString[];
	/**
	 * Format to apply to each pixel. If a function is given, it will be called
	 * for each pixel value, normalized to [0..1] interval (and after gamma
	 * correction). The function MUST return a valid format ID.
	 */
	format: number | FnN;
	/**
	 * Gamma correction value / exponent. All source pixel values will
	 * be raised by this exponent.
	 *
	 * @defaultValue 1
	 */
	gamma: number;
	/**
	 * If true, uses inverted pixel values.
	 *
	 * @defaultValue false
	 */
	invert: boolean;
	/**
	 * Number of bits/pixel in source image (only grayscale supported)
	 *
	 * @defaultValue 8
	 */
	bits: number;
}

export interface ClipRect {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	w: number;
	h: number;
}

export interface StrokeStyle {
	hl: string;
	vl: string;
	tl: string;
	tr: string;
	bl: string;
	br: string;
	tjl: string;
	tjr: string;
	tjt: string;
	tjb: string;
	jct: string;
	dot: string;
}

// https://en.wikipedia.org/wiki/Box-drawing_character

export const STYLE_ASCII: StrokeStyle = {
	hl: "-",
	vl: "|",
	tl: "+",
	tr: "+",
	bl: "+",
	br: "+",
	tjl: "+",
	tjr: "+",
	tjt: "+",
	tjb: "+",
	jct: "+",
	dot: ".",
};

export const STYLE_THIN: StrokeStyle = {
	hl: "─",
	vl: "│",
	tl: "┌",
	tr: "┐",
	bl: "└",
	br: "┘",
	tjl: "├",
	tjr: "┤",
	tjt: "┬",
	tjb: "┴",
	jct: "┼",
	dot: "•",
};

export const STYLE_THIN_ROUNDED: StrokeStyle = {
	...STYLE_THIN,
	tl: "╭",
	tr: "╮",
	bl: "╰",
	br: "╯",
};

export const STYLE_DASHED: StrokeStyle = {
	...STYLE_THIN,
	hl: "╌",
	vl: "┆",
};

export const STYLE_DASHED_ROUNDED: StrokeStyle = {
	...STYLE_DASHED,
	tl: "╭",
	tr: "╮",
	bl: "╰",
	br: "╯",
};

export const STYLE_DOUBLE: StrokeStyle = {
	hl: "═",
	vl: "║",
	tl: "╔",
	tr: "╗",
	bl: "╚",
	br: "╝",
	tjl: "╠",
	tjr: "╣",
	tjt: "╦",
	tjb: "╩",
	jct: "╬",
	dot: "•",
};

export const ENDINGS = "()[]{}<>^v◀▶▲▼•●";

export const BARS_H = " ▏▎▍▌▋▊▉█";
export const BARS_V = " ▁▂▃▄▅▆▇█";

export const SHADES_ASCII_10 = " .-:=+*#%@";
export const SHADES_ASCII_16 = " .,-:+=il3GXOQW0";

export const SHADES_BLOCK = " ░▒▓█";
export const SHADES_BLOCK_ALT = " ▖▞▟█";

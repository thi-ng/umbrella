import type { Fn3, IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { GLVec4 } from "@thi.ng/webgl";

export interface RawGlyphs {
	pages: string[];
	info: {
		face: string;
		size: number;
	};
	common: {
		scaleW: number;
		scaleH: number;
		lineHeight: number;
		base: number;
	};
	chars: {
		id: number;
		x: number;
		y: number;
		xoffset: number;
		yoffset: number;
		width: number;
		height: number;
		xadvance: number;
	}[];
}

export interface MSDFFont {
	fontFace: string;
	fontSize: number;
	tex: string;
	size: ReadonlyVec;
	lineHeight: number;
	baseLine: number;
	chars: IObjectOf<{
		pos: ReadonlyVec;
		size: ReadonlyVec;
		offset: ReadonlyVec;
		step: number;
	}>;
}

/**
 * Alignment function for a single line of text.
 *
 * @param font -
 * @param dir -
 * @param line -
 */
export type TextAlign = Fn3<MSDFFont, Partial<TextOpts>, string, number>;

export interface TextOpts {
	/**
	 * Text alignment function (individual per line).
	 * Default: `alignLeft`
	 */
	align: TextAlign;
	/**
	 * Horizontal spacing multiplier. Default: 1.0
	 */
	spacing: number;
	/**
	 * Leading (line height multiplier). Default: 1.0
	 */
	leading: number;
	/**
	 * X direction. Default: 1
	 */
	dirX: 1 | -1;
	/**
	 * Y direction. Default: 1
	 */
	dirY: 1 | -1;
	/**
	 * If true, {@link text} will produce color attributes.
	 */
	useColor: boolean;
	/**
	 * Default RGBA color, only used if `useColor = true`.
	 */
	color: GLVec4;
}

export type ColorString = [GLVec4, string];

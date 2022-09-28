import type { Stream } from "@thi.ng/rstream";

export type Vec2 = [number, number];
export type Vec4 = [number, number, number, number];

export interface Controls {
	/**
	 * Red channel controls (RGB channel weights & base offset)
	 */
	r: Vec4;
	/**
	 * Green channel controls (RGB channel weights & base offset)
	 */
	g: Vec4;
	/**
	 * Blue channel controls (RGB channel weights & base offset)
	 */
	b: Vec4;
	/**
	 * Exposure controls (brightness offset & curve exponent)
	 */
	exposure: Vec2;
}

/**
 * Same as {@link Controls}, but with reactive versions of original value types.
 */
export type ReactiveControls = {
	[id in keyof Controls]: Stream<Controls[id]>;
};

// each color channel's controls consist of:
// RGB weights + offset (all in [-1 .. +1] interval)
export const DEFAULT_R: Vec4 = [1, 0, 0, 0];
export const DEFAULT_G: Vec4 = [0, 1, 0, 0];
export const DEFAULT_B: Vec4 = [0, 0, 1, 0];

export const STYLE_BT = ".dib.h2.w-100.bn.bg-dark-gray.white";

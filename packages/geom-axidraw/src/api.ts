import type { ReadonlyVec } from "@thi.ng/vectors";

export interface AxiDrawAttribs {
	/**
	 * Clip polygon vertices. See {@link AsAxiDrawOpts.clip}.
	 */
	clip: ReadonlyVec[];
	/**
	 * Optional speed factor (multiple of globally configured draw speed).
	 * Depending on pen used, slower speeds might result in thicker strokes.
	 */
	speed: number;
	/**
	 * Optional shape specific delay (in ms), e.g. hold time for pen down when
	 * stippling...
	 */
	delay: number;
	/**
	 * Optional pen down position (%).
	 */
	down: number;
}

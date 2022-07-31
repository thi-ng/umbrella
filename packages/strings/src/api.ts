import type { Fn, Fn2, FnU } from "@thi.ng/api";

/**
 * UTF-8 Byte Order Mark character
 * https://en.wikipedia.org/wiki/Byte_order_mark
 */
export const BOM = "\ufeff";

export type Stringer<T> = (x: T, ...xs: any[]) => string;

export type FnS = FnU<string>;

export interface WordWrapOpts {
	/**
	 * Target line width for word wrapping.
	 *
	 * @default 80
	 */
	width: number;
	/**
	 * When adding a word to a line, and the line only has less than this
	 * option's value chars available and iff the word is longer than that, it
	 * will be placed into a new line (thus minimizing legibility issues).
	 *
	 * @defaultValue 4
	 */
	min: number;
	/**
	 * If true, words longer than {@link WordWrapOpts.width} will be split over
	 * multiple lines. If false (default), lines *might* become longer than the
	 * configured wrap width.
	 *
	 * @defaultValue false
	 */
	hard: boolean;
	/**
	 * Word splitting strategy. Use {@link SPLIT_ANSI} when wordwrapping text w/
	 * ANSI colors/seqs. The default {@link SPLIT_PLAIN} only supports plain
	 * text and will yield wrong results.
	 *
	 * @defaultValue SPLIT_PLAIN
	 */
	splitter: IWordSplit;
	/**
	 * Word delimiter string or regexp (whitespace by default).
	 */
	delimWord: RegExp | string;
	/**
	 * Line delimiter string or regexp (newline chars by default).
	 */
	delimLine: RegExp | string;
}

export interface IWordSplit {
	/**
	 * Returns the real length of given string (e.g. with ANSI control sequences
	 * removed).
	 */
	length: Fn<string, number>;
	/**
	 * Takes a string (word) and a desired split position. Returns a possibly
	 * adjusted split position, e.g. taking any control sequences into account
	 * (which can't be split).
	 *
	 * @param word -
	 * @param pos -
	 */
	split: Fn2<string, number, number>;
}

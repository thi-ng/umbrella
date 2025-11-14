// SPDX-License-Identifier: Apache-2.0
// thing:no-export
import type { Maybe } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { lengthAnsi } from "@thi.ng/strings/ansi";
import { padRight } from "@thi.ng/strings/pad-right";
import { repeat } from "@thi.ng/strings/repeat";
import { SPLIT_ANSI, wordWrapLines } from "@thi.ng/strings/word-wrap";
import { DEFAULT_THEME, type ColorTheme } from "./api.js";

/** @internal */
export const __ansi = (x: string, col?: number) =>
	col != null ? `\x1b[${col}m${x}\x1b[0m` : x;

/** @internal */
export const __padRightAnsi = (x: string, width: number) =>
	padRight(width)(x, lengthAnsi(x));

/** @internal */
export const __wrap = (str: Maybe<string>, width: number) =>
	str
		? wordWrapLines(str, {
				width,
				splitter: SPLIT_ANSI,
				hard: false,
		  })
		: [];

/** @internal */
export const __wrapWithIndent = (
	body: string,
	indent: number,
	width: number
) => {
	const prefix = repeat(" ", indent);
	return __wrap(body, width - indent)
		.map((l, i) => (i ? prefix + l : l))
		.join("\n");
};

/** @internal */
export const __colorTheme = (color?: boolean | Partial<ColorTheme>) =>
	isPlainObject(color)
		? { ...DEFAULT_THEME, ...color }
		: color !== false
		? DEFAULT_THEME
		: <ColorTheme>{};

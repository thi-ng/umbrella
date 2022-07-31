import type { FnAny, IObjectOf } from "@thi.ng/api";

/**
 * Function type used by `at_xxx()` functions or any
 * other function in the head position of a rule scope array.
 *
 * These fns have special behavior and are resonsible to
 * append their results to the CSS output string accumulator
 * directly.
 */
export type RuleFn = (acc: string[], opts: CSSOpts) => string[];

/**
 * Configuration type for conditional rule functions
 * (i.e. {@link at_media}, {@link at_supports})
 */
export type Conditional = string | IObjectOf<boolean | number | string>;

/**
 * Format
 */
export interface Format {
	rules: string;
	ruleSep: string;
	valSep: string;
	decls: string;
	declStart: string;
	declEnd: string;
	indent: string;
	comments: boolean;
}

/**
 * Config options supported by {@link css} and its helper functions.
 */
export interface CSSOpts {
	/**
	 * CSS output format config.
	 * Two presets are included: COMPACT (default), PRETTY
	 */
	format: Format;
	/**
	 * Dictionary object for JSON->CSS conversion
	 * Maps keys to rule functions.
	 * See quoted-functions.ts
	 */
	fns: IObjectOf<FnAny<RuleFn>>;
	/**
	 * Array or set of properties to prefix automatically.
	 * If given, each listed property will be prefixed
	 * with values given under `vendors`.
	 *
	 * By default, no properties are prefixed.
	 */
	autoprefix: string[] | Set<string>;
	/**
	 * Prefix strings for props under `autoprefix`
	 * Defaults to `DEFAULT_VENDORS` object.
	 */
	vendors: string[];
	/**
	 * Current tree depth. Internal use only. Ignore.
	 */
	depth: number;
	/**
	 * Optional scoping suffix for CSS classes
	 */
	scope: string;
}

export const DEFAULT_VENDORS = ["-moz-", "-ms-", "-o-", "-webkit-"];

/**
 * Default format config used by {@link css} function.
 * Forms "minimized" CSS without obsolete white space
 * and omits comments unless they were forced.
 */
export const COMPACT: Format = {
	rules: "",
	ruleSep: ",",
	valSep: "",
	decls: "",
	declStart: "{",
	declEnd: "}",
	indent: "",
	comments: false,
};

/**
 * Pretty printing format config with line breaks
 * and indentation.
 */
export const PRETTY: Format = {
	rules: "\n",
	ruleSep: ", ",
	valSep: " ",
	decls: "\n",
	declStart: " {\n",
	declEnd: "}\n",
	indent: "    ",
	comments: true,
};

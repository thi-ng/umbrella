/**
 * @remarks
 * Reference: https://www.w3.org/TR/css-color-4/#typedef-system-color
 */
export interface SystemColors {
	/**
	 * Background of application content or documents.
	 */
	canvas: string;
	/**
	 * Text in application content or documents.
	 */
	canvastext: string;
	/**
	 * Text in non-active, non-visited links. For light backgrounds,
	 * traditionally blue.
	 */
	linktext: string;
	/**
	 * Text in visited links. For light backgrounds, traditionally purple.
	 */
	visitedtext: string;
	/**
	 * Text in active links. For light backgrounds, traditionally red.
	 */
	activetext: string;
	/**
	 * The face background color for push buttons.
	 */
	buttonface: string;
	/**
	 * Text on push buttons.
	 */
	buttontext: string;
	/**
	 * The base border color for push buttons.
	 */
	buttonborder: string;
	/**
	 * Background of input fields.
	 */
	field: string;
	/**
	 * Text in input fields.
	 */
	fieldtext: string;
	/**
	 * Background of selected items/text.
	 */
	highlight: string;
	/**
	 * Text of selected items/text.
	 */
	highlighttext: string;
	/**
	 * Background of text that has been specially marked (such as by the HTML
	 * mark element).
	 */
	mark: string;
	/**
	 * Text that has been specially marked (such as by the HTML mark element).
	 */
	marktext: string;
	/**
	 * Disabled text. (Often, but not necessarily, gray.)
	 */
	graytext: string;
}

/**
 * Default CSS system colors used by {@link parseCss}. Use
 * {@link setSystemColors} to provide custom defaults.
 */
export let CSS_SYSTEM_COLORS: SystemColors = {
	canvas: "fff",
	canvastext: "000",
	linktext: "001ee4",
	visitedtext: "4e2386",
	activetext: "eb3323",
	buttonface: "ddd",
	buttontext: "000",
	buttonborder: "000",
	field: "fff",
	fieldtext: "000",
	highlight: "bbd5fb",
	highlighttext: "000",
	mark: "000",
	marktext: "fff",
	graytext: "808080",
};

/**
 * Merges {@link CSS_SYSTEM_COLORS} w/ new values.
 *
 * @param cols -
 */
export const setSystemColors = (cols: Partial<SystemColors>) =>
	Object.assign(CSS_SYSTEM_COLORS, cols);

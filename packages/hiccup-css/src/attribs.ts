const $ =
	(op: string) =>
	(id: string, x: string | number, caseSensitve = false) =>
		`[${id}${op}="${x}"${caseSensitve ? " i" : ""}]`;

/**
 * Returns attrib selector: `[id]`
 *
 * @param id -
 */
export const withAttrib = (id: string) => `[${id}]`;

/**
 * Returns attrib selector `[id=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */
export const attribEq = $("");

/**
 * Returns attrib selector `[id~=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */
export const attribContains = $("~");

/**
 * Returns attrib selector `[id^=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */
export const attribPrefix = $("^");

/**
 * Returns attrib selector `[id$=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */
export const attribSuffix = $("$");

/**
 * Returns attrib selector `[id*=x]`
 * @param id -
 * @param x -
 * @param caseSensitive -
 */
export const attribMatches = $("*");

/**
 * Takes an array of string parts and returns a new string of each part's
 * initial character. The `mode` arg can be used to customize result casing
 * (default: uppercase). If `mode` is null, the original casing will be kept.
 *
 * @example
 * ```ts tangle:../export/initials.ts
 * import { initials } from "@thi.ng/strings";
 *
 * console.log(
 *   initials(["alicia", "bella", "carerra"])
 * );
 * // "ABC"
 *
 * console.log(
 *   initials("shader-ast-GLSL".split("-"))
 * );
 * // "SAG"
 *
 * console.log(
 *   initials("Ludwig van Beethoven".split(" "), null)
 * );
 * // "LvB"
 * ```
 *
 * @param parts -
 * @param mode -
 */
export const initials = (parts: string[], mode: "u" | "l" | null = "u") => {
	const res = parts.map((x) => x[0]).join("");
	return mode === "u"
		? res.toUpperCase()
		: mode === "l"
		? res.toLowerCase()
		: res;
};

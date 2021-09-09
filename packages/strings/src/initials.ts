/**
 * Takes an array of string parts and returns a new string of each part's
 * initial character. The `mode` arg can be used to customize result casing
 * (default: uppercase). If `mode` is null, the original casing will be kept.
 *
 * @example
 * ```ts
 * initials(["alicia", "bella", "carerra"]);
 * // "ABC"
 *
 * initials("shader-ast-GLSL".split("-"))
 * // "SAG"
 *
 * initials("Ludwig van Beethoven".split(" "), null)
 * // "LvB"
 * ```
 *
 * @param parts
 * @param mode
 */
export const initials = (parts: string[], mode: "u" | "l" | null = "u") => {
    const res = parts.map((x) => x[0]).join("");
    return mode === "u"
        ? res.toUpperCase()
        : mode === "l"
        ? res.toLowerCase()
        : res;
};

/**
 * Returns true if `x` is a string, number or boolean.
 *
 * @param x - 
 */
export const isPrimitive = (x: any): x is string | number | boolean => {
    const t = typeof x;
    return t === "string" || t === "number" || t === "boolean";
};

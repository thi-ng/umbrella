const $ = (op) => (id: string, x: string | number, caseSensitve = false) => `[${id}${op}="${x}"${caseSensitve ? " i" : ""}]`;
export const withAttrib = (id: string) => `[${id}]`;
export const attribEq = $("");
export const attribIncl = $("~");
export const attribPrefix = $("^");
export const attribSuffix = $("$");
export const attribContains = $("*");
